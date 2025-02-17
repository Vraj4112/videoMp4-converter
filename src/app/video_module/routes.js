const express = require("express");
const router = express.Router();
const videoController = require("./controllers");
const videoValidator = require("./validators");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post(
  "/upload",
  upload.array("videos", 10),
  videoValidator.validateUpload,
  videoController.uploadVideos
);

router.get("/:id/status", videoController.getVideoStatus);
router.get("/", videoController.getAllVideoList);

module.exports = router;
