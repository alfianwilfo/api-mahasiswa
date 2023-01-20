const express = require("express");
const app = express();
const controller = require("../controllers/mahasiswa");

app.get("/", controller.getAll);
app.post("/", controller.createMahasiswa);
app.get("/:id", controller.findById);

module.exports = app;
