const Community = require("../models/communityModel");
const Post = require("../models/postModel");

function pickCommunityFields(body) {
  const allowed = {};

  if (body.name !== undefined) allowed.name = body.name;
  if (body.description !== undefined) allowed.description = body.description;
  if (body.memberCount !== undefined) allowed.memberCount = body.memberCount;

  return allowed;
}

const getAllCommunities = async (req, res, next) => {
  try {
    const communities = await Community.find().sort({ name: 1 });
    res.status(200).json(communities);
  } catch (error) {
    next(error);
  }
};

const getCommunityById = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    next(error);
  }
};

const getCommunityPosts = async (req, res, next) => {
  try {
    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ error: "Not found" });
    }

    const posts = await Post.find({ communityId: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const createCommunity = async (req, res, next) => {
  try {
    const community = await Community.create(pickCommunityFields(req.body));
    res.status(201).json(community);
  } catch (error) {
    next(error);
  }
};

const updateCommunity = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      pickCommunityFields(req.body),
      { new: true, runValidators: true }
    );

    if (!community) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    next(error);
  }
};

const deleteCommunity = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndDelete(req.params.id);

    if (!community) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCommunities,
  getCommunityById,
  getCommunityPosts,
  createCommunity,
  updateCommunity,
  deleteCommunity,
};