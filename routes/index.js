const express = require("express");
const app = express();
const mahasiswa = require("./mahasiswa");
const matkul = require("./matkul");
const studi = require("./studi");

app.use("/mahasiswa", mahasiswa).use("/matkul", matkul).use("/studi", studi);

module.exports = app;
