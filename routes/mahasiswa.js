const express = require("express");
const app = express();
const controller = require("../controllers/mahasiswa");

app.get("/", controller.getAll);

module.exports = app;
