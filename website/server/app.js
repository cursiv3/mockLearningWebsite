const express = require("express");
const morgan = require("morgan");
const app = express();
const bodyParser = require("body-parser");
const validator = require("validator");
const router = new express.Router();
const authRoutes = require("./server/routes/auth");

app.use(express.static("../client/build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//app.use(middleware to check for token here)
app.use("/auth", authRoutes);

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

module.exports = app;
