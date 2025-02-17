const express = require("express");
const app = express();

const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const path = require("path");

const helmetConfig = require("./helmet-config");
const rateLimitConfig = require("./rateLimit-config");

// Middleware configurations
app.use(rateLimitConfig);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({ threshold: 1024 }));

helmetConfig(app); // Configure helmet

// Static files
//app.use("/uploads", express.static("uploads"));
//app.use("/view_converted", express.static("converted_videos"));
app.use(express.static(path.resolve("./public")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./client/views"));

// Routes and middlewares
const src = require("../src/versionRoutes");
const errorHandler = require("../src/middlewares/errorHandler");

app.use("/api", src); // Main entry point to application
app.use(errorHandler);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    message: "Welcome to the Video Processing App",
  });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404", message: "Route not found." });
});

module.exports = app;
