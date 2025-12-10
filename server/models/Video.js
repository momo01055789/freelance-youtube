const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the video"],
    trim: true,
    maxlength: [200, "Title cannot be more than 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for the video"],
    trim: true,
    maxlength: [2000, "Description cannot be more than 2000 characters"],
  },
  videoId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  category: {
    type: String,
    required: [true, "Please provide a category for the video"],
    enum: {
      values: ["sports", "fitness", "history", "other"],
      message: "Category must be either sports, fitness, history, or other",
    },
  },
  thumbnail: {
    public_id: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "https://via.placeholder.com/1280x720",
    },
  },
  duration: {
    type: String,
    default: "0:00",
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create text index for search functionality
videoSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Video", videoSchema);
