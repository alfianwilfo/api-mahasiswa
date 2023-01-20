const express = require("express");
const app = express();
const mahasiswa = require("./mahasiswa");
const matkul = require("./matkul");

app.use("/mahasiswa", mahasiswa);
app.use("/matkul", matkul);

module.exports = app;
