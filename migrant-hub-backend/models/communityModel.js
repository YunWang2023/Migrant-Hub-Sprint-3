const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300,
  },
  memberCount: {
    type: Number,
    default: 0,
    min: 0,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, community) => {
      community.id = community._id.toString();
      delete community._id;
      delete community.__v;
      return community;
    },
  },
});
const Community = mongoose.model("Community", communitySchema);
module.exports = Community;