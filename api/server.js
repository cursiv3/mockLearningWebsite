"use strict";

const express = require("express");
const path = require("path");

const app = express();

const promise = require("bluebird");

const options = {
  promiseLib: promise
};

const pgp = require("pg-promise")(options);

const connectionString =
  "postgresql://dbadmin:cpa123@localhost:5432/smockusers";
const db = pgp(connectionString);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("api server");
});

app.get("/login/submit", (req, res, err) => {
  db
    .many("SELECT username, pword FROM users WHERE id = 1")
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err);
});

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
