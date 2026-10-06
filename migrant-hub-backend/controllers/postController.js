const Post = require("../models/postModel");
const { enrichPost } = require("../services/aiService");

// only these fields may ever come from the client
function pickPostFields(body) {
  const allowed = {};

  if (body.title !== undefined) allowed.title = body.title;
  if (body.body !== undefined) allowed.body = body.body;
  if (body.category !== undefined) allowed.category = body.category;
  if (body.tags !== undefined) allowed.tags = body.tags;
  if (body.aiTeaser !== undefined) allowed.aiTeaser = body.aiTeaser;
  if (body.communityId !== undefined) allowed.communityId = body.communityId;
  if (body.imageUrl !== undefined) allowed.imageUrl = body.imageUrl;

  return allowed;
}

function canModify(post, user) {
  if (!post.user) return true; // seeded posts have no owner
  return post.user.equals(user._id) || user.role === "admin";
}

const getAllPosts = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.communityId) {
      filter.communityId = req.query.communityId;
    }

    if (req.query.search) {
      const safe = String(req.query.search).replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );
      filter.$or = [
        { title: { $regex: safe, $options: "i" } },
        { body: { $regex: safe, $options: "i" } },
      ];
    }

    const requested = Number(req.query.limit);
    const limit = Number.isFinite(requested) && requested > 0 ? requested : 100;

    const posts = await Post.find(filter).sort({ createdAt: -1 }).limit(limit);

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      ...pickPostFields(req.body),
      user: req.user._id,
      author: req.user.name,
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const existing = await Post.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Not found" });
    }

    if (!canModify(existing, req.user)) {
      return res
        .status(403)
        .json({ error: "You can only change your own posts" });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      pickPostFields(req.body),
      { new: true, runValidators: true }
    );

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const existing = await Post.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "Not found" });
    }

    if (!canModify(existing, req.user)) {
      return res
        .status(403)
        .json({ error: "You can only delete your own posts" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const generatePostSuggestions = async (req, res, next) => {
  try {
    const { title, body } = req.body;

    if (typeof title !== "string" || typeof body !== "string" || !title.trim() || !body.trim()) {
      return res.status(400).json({ error: "Title and body are required" });
    }

    const suggestions = await enrichPost({ title, body });

    if (!suggestions) {
      return res
        .status(503)
        .json({ error: "AI suggestions are currently unavailable" });
    }

    res.status(200).json(suggestions);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  generatePostSuggestions,
};