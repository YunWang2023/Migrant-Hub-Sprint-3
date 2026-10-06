const MustDo = require("../models/mustDoModel");

function pickMustDoFields(body) {
  const fields = [
    "slug",
    "title",
    "summary",
    "whatIsIt",
    "whoNeedsIt",
    "documents",
    "howLong",
    "officialUrl",
    "officialLabel",
    "checkedOn",
    "order",
  ];

  const allowed = {};

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      allowed[field] = body[field];
    }
  });

  return allowed;
};

const getAllMustDo = async (req, res, next) => {
  try {
    const items = await MustDo.find().sort({ order: 1 });
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

const getMustDoBySlug = async (req, res, next) => {
  try {
    const item = await MustDo.findOne({ slug: req.params.slug });

    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const createMustDo = async (req, res, next) => {
  try {
    const item = await MustDo.create(pickMustDoFields(req.body));
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const updateMustDo = async (req, res, next) => {
  try {
    const item = await MustDo.findOneAndUpdate(
      { slug: req.params.slug },
      pickMustDoFields(req.body),
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

const deleteMustDo = async (req, res, next) => {
  try {
    const item = await MustDo.findOneAndDelete({ slug: req.params.slug });

    if (!item) {
      return res.status(404).json({ error: "Not found" });
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
  deleteMustDo,
};