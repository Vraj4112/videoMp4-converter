const Video = require("../../database/models/videoModel");
const notificationService = require("./notificationService");

const VideoService = {
  async uploadVideos(files, userEmail) {
    let videoEntries = [];

    for (const file of files) {
      try {
        const videoData = {
          originalName: file.originalname,
          path: file.path,
          status: "Pending",
          userEmail,
        };

        const video = new Video(videoData);
        await video.save();
        videoEntries.push(video);
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    }

    return videoEntries;
  },

  async updateVideoStatus(videoId, status, convertedPath = null) {
    const updateData = { status };
    if (convertedPath) {
      const newPath = convertedPath.replace("public\\", "");
      console.log("Check on path -->", newPath);

      updateData.convertedPath = newPath;
    }
    const video = await Video.findByIdAndUpdate(videoId, updateData, {
      new: true,
    });

    // Emit status update
    notificationService.emitStatusUpdate(video);

    //io.emit("videoStatusUpdate", { videoId, status: video.status });

    return video;
  },

  async getVideoById(videoId) {
    const video = await Video.findById(videoId);
    return video;
  },
};

module.exports = VideoService;
