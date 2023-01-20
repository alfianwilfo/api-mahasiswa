const express = require("express");
const app = express();
const mahasiswa = require("./mahasiswa");

app.use("/mahasiswa", mahasiswa);

module.exports = app;
