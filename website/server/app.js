const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");

app.use(express.static("../client/build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
