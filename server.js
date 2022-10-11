require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const api = require("./src/api");
const nunjucks = require("nunjucks");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});
app.use("/api", api);

app.get("/", async (req, res) => {
  res.render("index.html");
});
app.get("/bookmarks", async (req, res) => {
  res.render("bookmarks.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    `${process.env.npm_package_name} listening on port : ` +
      listener.address().port,
  );
});
