const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Adjust the log level as needed (error, warn, info, verbose, debug, silly)
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    //new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "combined.log" }), // Log to file
  ],
});

module.exports = logger;
