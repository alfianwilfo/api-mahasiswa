const express = require("express");
const app = express();
const mahasiswa = require("./mahasiswa");
const matkul = require("./matkul");

app.use("/mahasiswa", mahasiswa);
app.use("/matkul", matkul);
app.use("/studi");

module.exports = app;
