const express = require("express");
const path = require("path");

const app = express();

var promise = require("bluebird");

var options = {
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = "postgres://localhost:5432/smmusers";
var db = pgp(connectionString);

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

app.get("/login/submit", (req, res, next) => {
  db.many("SELECT username, pword FROM users").then(data => {
    res
      .status(200)
      .json({
        status: "success",
        payload: data,
        message: "retrieved username/pw"
      })
      .catch(err => next(err));
  });
});

app.post("/signup/submit", (req, res, next) => {
  db
    .many("INSERT INTO users (username, pword, email) VALUES ($1, $2, $3)")
    .then(data => {
      res
        .status(200)
        .json({
          status: "success",
          payload: data,
          message: "inserted new user"
        })
        .catch(err => next(err));
    });
});

module.exports = app;
