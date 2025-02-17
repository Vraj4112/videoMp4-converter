const express = require("express");
const app = express();

const version1 = require("./app/appv1Routes");

app.use("/", version1);

module.exports = app;
