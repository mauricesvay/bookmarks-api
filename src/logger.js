const path = require("path");
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: process.env.DEBUG_LEVEL || "info",
  meta: true,
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "../error.log"),
      level: "error",
    }),
    new transports.File({ filename: path.join(__dirname, "../combined.log") }),
  ],
});

module.exports = logger;
