const ffmpeg = require("fluent-ffmpeg");
const { getIO } = require("../../../config/socket-io-config");

const FFmpegService = {
  convert(inputPath, outputPath, videoId) {
    return new Promise((resolve, reject) => {
      const io = getIO();
      ffmpeg(inputPath)
        .output(outputPath)
        .on("progress", function (progress) {
          const percentage = Math.floor(progress.percent);
          io.emit("videoProgress", {
            videoId: videoId,
            percentage: percentage,
          });
        })
        .on("end", () => {
          console.log(`Video conversion completed: ${outputPath}`);
          resolve();
        })
        .on("error", (err) => {
          console.error(`Error converting video: ${err.message}`);
          reject(err);
        })
        .run();
    });
  },
};

module.exports = FFmpegService;
