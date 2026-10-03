const MustDo = require("../models/mustDoModel");

// GET all Must Do items
const getAllMustDo = async (req, res, next) => {
  try {
    const items = await MustDo.find().sort({ order: 1 });

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// GET one Must Do item by slug
const getMustDoBySlug = async (req, res, next) => {
  try {
    const item = await MustDo.findOne({ slug: req.params.slug });

    if (!item) {
      return res.status(404).json({
        error: "Not found"
      });
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// POST
const createMustDo = async (req, res, next) => {
  try {
    const item = await MustDo.create(req.body);

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// PATCH
const updateMustDo = async (req, res, next) => {
  try {
    const item = await MustDo.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!item) {
      return res.status(404).json({
        error: "Not found"
      });
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteMustDo = async (req, res, next) => {
  try {
    const item = await MustDo.findOneAndDelete({
      slug: req.params.slug
    });

    if (!item) {
      return res.status(404).json({
        error: "Not found"
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMustDo,
  getMustDoBySlug,
  createMustDo,
  updateMustDo,
  deleteMustDo
};