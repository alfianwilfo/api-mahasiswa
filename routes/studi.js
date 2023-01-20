const express = require("express");
const studi = require("../controllers/rencanaStudi");
const app = express();

app.get("/", studi.getAll);

module.exports = app;
