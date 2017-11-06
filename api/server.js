"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const promise = require("bluebird");

const jwt = require("jsonwebtoken");
const config = require("./config");

const model = require("./userModel");

const options = {
  promiseLib: promise
};

// create app port
const PORT = process.env.PORT || 8000;

//connect to postgres db, set superSecret to jwt secret var
const pgp = require("pg-promise")(options);
const db = pgp(config.database);
app.set("superSecret", config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//CORS allow all
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("api server");
});

// =========================== test db ===========================
app.get("/setup", (req, res) => {
  db
    .none("INSERT INTO users(username, pword, email) VALUES($1, $2, $3)", [
      "cursiv3",
      "password",
      "csl503@email.com"
    ])
    .then(data => {
      console.log("User saved successfully!");
      res.json({
        success: true,
        message: "user submitted"
      });
    })
    .catch(error => {
      console.log("failed, error: " + error);
      res.json({ success: false, err: error });
    });
});
// =========================== test db ===========================

app.post("/login/submit", (req, res) => {
  db
    .any("SELECT * FROM users WHERE username = $1 AND pword = $2", [
      req.body.username,
      req.body.password
    ])
    .then(data => {
      if (!data) {
        res.json({
          success: false,
          message: "User not found."
        });
      } else {
        var usr = data[0].username;
        var pw = data[0].pword;
        if (pw != req.body.password || usr != req.body.username) {
          res.json({
            success: false,
            message: "Username/password incorrect."
          });
        } else {
          const payload = { user: usr };
          var token = jwt.sign(payload, app.get("superSecret"), {
            expiresIn: 60 * 60 * 24
          });
          console.log("Successfull created token!");
          res.json({ success: true, message: "Token created", token: token });
        }
      }
    })
    .catch(error => {
      console.log("failed, error: " + error);
      res.json({ success: false, err: error });
    });
});

app.post("/signup/submit", (req, res, next) => {
  console.log(req.body);
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

// start the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

module.exports = app;
