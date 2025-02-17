const VideoService = require("../../utilities/services/videoService");
const QueueService = require("../../utilities/services/queueService");
const Video = require("../../database/models/videoModel");

const uploadVideos = async (req, res, next) => {
  try {
    const files = req.files;
    const userEmail = req.body.email;

    if (!files || files.length === 0) {
      return res.render("upload_error", { message: "No files were uploaded." });
    }

    const videos = await VideoService.uploadVideos(files, userEmail);

    // Add videos to the processing queue
    for (const video of videos) {
      QueueService.addVideoToQueue({
        videoId: video._id.toString(),
        path: video.path,
      });
    }

    res.render("upload_success", {
      message: "Videos uploaded successfully.",
      videos,
    });
  } catch (error) {
    next(error);
  }
};

const getVideoStatus = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const video = await VideoService.getVideoById(videoId);

    if (!video) {
      return res.render("status_error", { message: "Video not found." });
    }

    res.render("status", {
      video,
    });
  } catch (error) {
    next(error);
  }
};

const getAllVideoList = async (req, res, next) => {
  try {
    const videos = await Video.find({});
    res.render("video_list", { videos });
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadVideos, getVideoStatus, getAllVideoList };
