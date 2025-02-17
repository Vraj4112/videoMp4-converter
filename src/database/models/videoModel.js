const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  convertedName: { type: String },
  path: { type: String, required: true },
  convertedPath: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Uploading", "Converting", "Completed", "Error"],
    default: "Pending",
  },
  uploadDate: { type: Date, default: Date.now },
  userEmail: { type: String }, // For sending notifications
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
