require("../../../config/env-config");
const Bull = require("bull");
const path = require("path");
const FFmpegService = require("./ffmpegService");
const NotificationService = require("./notificationService");
const VideoService = require("./videoService");

const videoQueue = new Bull("video-processing", {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "127.0.0.1",
  },
});

videoQueue.process(1, async (job) => {
  const { videoId, path: inputPath } = job.data;
  const outputName = `${videoId}.mp4`;
  const outputPath = path.join("public", "converted_videos", outputName);

  try {
    // Update status to 'Converting'
    await VideoService.updateVideoStatus(videoId, "Converting");

    // Send notification that conversion has started
    const video = await VideoService.getVideoById(videoId);
    await NotificationService.sendConversionStartedEmail(
      video.userEmail,
      video
    );

    // Convert video
    await FFmpegService.convert(inputPath, outputPath, videoId);

    // Update status to 'Completed'
    await VideoService.updateVideoStatus(videoId, "Completed", outputPath);

    // Send notification that conversion has completed
    await NotificationService.sendConversionCompletedEmail(
      video.userEmail,
      video
    );
  } catch (error) {
    // Update status to 'Error'
    await VideoService.updateVideoStatus(videoId, "Error");

    // Send error notification
    const video = await VideoService.getVideoById(videoId);
    await NotificationService.sendErrorNotification(video.userEmail, error);

    throw error;
  }
});

videoQueue.on("error", (err) => {
  console.error("Queue Error:", err);
});

videoQueue.on("active", (job) => {
  console.log(`Job ${job.id} is now active.`);
});

videoQueue.on("completed", (job, result) => {
  console.log(`Job ${job.id} completed.`);
});

videoQueue.on("failed", (job, err) => {
  console.error(`Job failed ${job.id}: ${err.message}`);
});

const QueueService = {
  addVideoToQueue(data) {
    //console.log("Adding job to queue:", data);
    videoQueue.add(data, {
      attempts: 3,
      backoff: 5000, // Retry after 5 seconds
    });
  },
};

module.exports = QueueService;
