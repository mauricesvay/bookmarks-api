require("dotenv").config();
const Sequelize = require("sequelize");
const Link = require("./src/models/link");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, process.env.DB_PATH),
});

sequelize
  .authenticate()
  .then(() => {
    console.info("Connection has been established successfully.");
    Link.init(sequelize);
    Link.sync({ force: true });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
