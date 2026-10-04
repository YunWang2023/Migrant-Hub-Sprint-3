const mongoose = require("mongoose");

const categories = [
  "Housing",
  "Paperwork",
  "Transport",
  "Food",
  "Study",
  "Community",
  "Places",
];

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (text) => text.trim().split(/\s+/).length <= 512,
      message: "body exceeds the 512 word limit",
    },
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: categories,
  },
  tags: {
    type: [String],
    default: [],
  },
  aiTeaser: {
    type: String,
    default: null,
  },
  communityId: {
    type: String,
    default: null,
  },
  imageUrl: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, post) => {
      post.id = post._id.toString();
      delete post._id;
      delete post.__v;
      return post;
    },
  },
});


const Post = mongoose.model("Post", postSchema);
module.exports = Post;