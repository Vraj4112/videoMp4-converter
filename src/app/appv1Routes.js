const express = require("express");
const app = express();
const path = require("path");

const video = require("./video_module/routes");

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./client/views"));

app.use("/videos", video);

module.exports = app;
