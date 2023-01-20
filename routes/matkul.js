const express = require("express");
const matkul = require("../controllers/matkul");
const app = express();

app.get("/", matkul.getAll);

module.exports = app;
