const { getIO } = require("../../../config/socket-io-config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const NotificationService = {
  async sendConversionStartedEmail(recipientEmail, video) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Video Conversion Started",
      text: `Your video "${video.originalName}" has started converting.`,
    };

    await transporter.sendMail(mailOptions);
  },

  async sendConversionCompletedEmail(recipientEmail, video) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Video Conversion Completed",
      text: `Your video "${video.originalName}" has been converted successfully.`,
    };

    await transporter.sendMail(mailOptions);
  },

  async sendErrorNotification(recipientEmail, error) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Video Conversion Error",
      text: `There was an error converting your video: ${error.message}`,
    };

    await transporter.sendMail(mailOptions);
  },

  emitStatusUpdate(video) {
    const io = getIO();
    io.emit("videoStatusUpdate", {
      videoId: video._id.toString(),
      status: video.status,
      convertedPath: video.convertedPath,
    });
  },
};

module.exports = NotificationService;
