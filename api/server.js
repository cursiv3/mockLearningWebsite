"use strict";

const express = require("express");
const path = require("path");

const app = express();

const promise = require("bluebird");

const options = {
  promiseLib: promise
};

const pgp = require("pg-promise")(options);
const connectionString = "postgres://localhost/smmusers";
const db = pgp(connectionString);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

app.get("/", (req, res) => {
  res.send(console.log("api server"));
});

/*
app.get("/login/submit", (req, res, next) => {
  db
    .many("SELECT username, pword FROM users" + "values({$username}, ${pword})")
    .then(data => {
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
*/
app.post("/signup/submit", (req, res, next) => {
  db
    .none(
      "insert into users(username, pword, email)" +
        "values(${username}, ${pword}, ${email})",
      req.body
    )
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted new user"
      });
    })
    .catch(err => next(err));
});

module.exports = app;
