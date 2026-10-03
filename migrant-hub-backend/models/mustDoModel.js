const mongoose = require("mongoose");

const mustDoSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  whatIsIt: {
    type: String,
    required: true,
    trim: true,
  },
  whoNeedsIt: {
    type: String,
    required: true,
    trim: true,
  },
  documents: {
    type: [String],
    default: [],
  },
  howLong: {
    type: String,
    required: true,
    trim: true,
  },
  officialUrl: {
    type: String,
    required: true,
    trim: true,
  },
  officialLabel: {
    type: String,
    required: true,
    trim: true,
  },
  checkedOn: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    min: 1,
  },
},{
  timestamps: true,
  toJSON: {
    transform: (doc, item) => {
      item.id = item._id.toString();
      delete item._id;
      delete item.__v;
      return item;
    },
  },
});

const MustDo = mongoose.model("MustDo", mustDoSchema);
module.exports = MustDo;