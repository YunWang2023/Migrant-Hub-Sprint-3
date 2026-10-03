const Community = require("../models/communityModel");

// GET all communities
const getAllCommunities = async (req, res, next) => {
  try {
    const communities = await Community.find().sort({ name: 1 });
    res.status(200).json(communities);
  } catch (error) {
    next(error);
  }
};

// GET one community by id
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

// GET posts belonging to a community
const getCommunityPosts = async (req, res, next) => {
  try {
    const Post = require("../models/postModel");

    const community = await Community.findById(req.params.id);

    if (!community) {
      return res.status(404).json({ error: "Not found" });
    }

    const posts = await Post.find({
      communityId: req.params.id
    }).sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// POST
const createCommunity = async (req, res, next) => {
  try {
    const community = await Community.create(req.body);
    res.status(201).json(community);
  } catch (error) {
    next(error);
  }
};

// PATCH
const updateCommunity = async (req, res, next) => {
  try {
    const community = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!community) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(community);
  } catch (error) {
    next(error);
  }
};

// DELETE
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
  deleteCommunity
};