"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const promise = require("bluebird");
const bcrypt = require("bcrypt");
const http = require("http");
const https = require("https");
const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const config = require("./config");
const nodemailer = require("nodemailer");
const uuidv4 = require('uuid/v4');
const mailerOptionsSetup = require('./nodeMailer/mailerOptionsSetup');


// ============== postgres DB items ===================================
const options = {
  promiseLib: promise
};
const pgp = require("pg-promise")(options);
const db = pgp(config.db.databaseHost);

// ====================================================================

// jwt secret
app.set("superSecret", config.auth.secret);

// =============== helpers ============================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// ====================================================================

// ===================== CORS =========================================
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.options("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});

// ====================================================================

//*********************************************************************
//                       UNPROTECTED ROUTES
//*********************************************************************

app.get("/", (req, res) => {
  res.send("Corey's api server");
});

// =======================sign up route ===============================
app.post("/signup/submit", (req, res) => {
  let username = req.body.username,
    email = req.body.email,
    password = req.body.password,
    userId;

  db
    .task("check-dupes", async DB => {

      return [
        await DB.oneOrNone(`SELECT username FROM users WHERE username = $1`, [
          username
        ]),
        await DB.oneOrNone(`SELECT email FROM users WHERE email = $1`, [
          email
        ])
      ];
    })
    .then(userList => {
      if (userList[0] != null) {
        res.json({ success: false, message: "Username already exists." });
      } else if (userList[1] != null) {
        res.json({
          success: false,
          message: "Email address already in use."
        });
      } else {
        let saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hashPass) => {

          // db
          //   .none(
          //     "INSERT INTO unverified_users(username, password, email) VALUES($1, $2, $3)",
          //     [username, hashPass, email]
          //   )
          // db
          //   .task("insert new signup and get new id", async DB => {
          //
          //     return [
          //       await db.none(`INSERT INTO unverified_users(username, password, email, email_verified) VALUES($1, $2, $3, $4)`,
          //         [username, hashPass, email, false]
          //       )
          //       // await DB.oneOrNone(`SELECT id FROM users WHERE email = $1`, [
          //       //   email
          //       // ])
          //     ];
          //   });
          db.none(`INSERT INTO users(username, pword, email, email_verified) VALUES($1, $2, $3, $4)`,
            [username, hashPass, email, false]
          )
            // db.oneOrNone(`SELECT id FROM unverified_users WHERE email = $1`, [
            //   email
            // ])
            .then(data => {
              var payload = { user: username }
              var token = jwt.sign(payload, app.get("superSecret"), {
                expiresIn: 86400
              });
              let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: config.mailerEmail,
                  pass: config.mailerPW
                }
              });


              let mailOptions = mailerOptionsSetup(token, email);

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  return console.log(err);
                }
              });

            })
            .catch(error => {
              console.log("failed, error: " + error);
              res.json({ success: false, err: error });
            });
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, message: "Server 500 error" });
    });
});
// ====================================================================

app.get("/verify/email", (req, res) => {
  const allParams = req.query.token;
  const token = `${allParams.match(/.+?(?=\?)/)}`;
  const userEmail = `${allParams.match(/[^=]+$/)}`

  if (token) {
    jwt.verify(token, app.get("superSecret"), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: "Authentication failed.", error: err.message });
      } else {
        db.none(`
            UPDATE users 
            SET email_verified = true
            WHERE email = ${userEmail};
          `)
      }
    });
  } else {
    return res.json({ success: false, message: "No authentication provided." });
  }
});

// ======================= login / token creation =====================
app.post("/login/submit", (req, res) => {
  db
    .any("SELECT * FROM users WHERE username = $1", [req.body.username])
    .then(user => {
      if (user.length < 1) {
        res.json({
          success: false,
          message: "User does not exist."
        });
      } else {
        var usr = user[0].username;
        var hashPass = user[0].pword;

        bcrypt.compare(req.body.password, hashPass, (err, doesPwMatch) => {
          if (doesPwMatch != true || usr != req.body.username) {
            res.json({
              success: false,
              message: "Username or password incorrect."
            });
          } else {
            const payload = { user: usr };
            var token = jwt.sign(payload, app.get("superSecret"), {
              expiresIn: 60 * 60 * 24
            });
            console.log("Successfully created token!");
            res.json({ success: true, message: "Token created", token: token });
          }
        });
      }
    })
    .catch(error => {
      console.log("CATCH ERROR: " + error);
      res.json({ success: false, err: error });
    });
});

// ====================================================================

// ********************************************************************
//                      END UNPROTECTED ROUTES
// ********************************************************************

// ================== MIDDLEWARE verify token =========================

app.use((req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (token) {
    jwt.verify(token, app.get("superSecret"), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: "Authentication failed." });
      } else {
        req.decoded = decoded;
        res.json({ success: true });
      }
    });
  } else {
    return res.json({ success: false, message: "No authentication provided." });
  }
});

// ====================================================================

///////////////////////////////////////////////////////////////////////
///////////////////   PROTECTED ROUTES   //////////////////////////////
///////////////////     BELOW HERE       //////////////////////////////
///////////////////////////////////////////////////////////////////////

app.get("/auth", (req, res) => {
  res.send("it protected route!");
});

///////////////////////////////////////////////////////////////////////
///////////////////   PROTECTED ROUTES   //////////////////////////////
///////////////////      ABOVE HERE      //////////////////////////////
///////////////////////////////////////////////////////////////////////

// ==================== create / run server ===========================

const port = process.env.PORT || 8000;
const credentials = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem")
};

const server = https.createServer(credentials, app).listen(port, () => {
  console.log("server running at " + port);
});

// ====================================================================

module.exports = app;
