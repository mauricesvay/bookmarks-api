const Sequelize = require("sequelize");
const Link = require("./models/link");
const path = require("path");
const logger = require("./logger");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../", process.env.DB_PATH),
  logging: logger.debug.bind(logger),
});

sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
    Link.init(sequelize);
  })
  .catch((err) => {
    logger.error("Unable to connect to the database", err);
  });

module.exports = sequelize;
