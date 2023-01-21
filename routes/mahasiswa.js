const express = require("express");
const app = express();
const controller = require("../controllers/mahasiswa");
const { checkRequestMahasiswa } = require("../middlewares/authentication");

app.get("/", controller.getAll);
app.post("/", checkRequestMahasiswa, controller.createMahasiswa);
app.get("/:id", controller.findById);
app.delete("/:id", controller.deleteMahasiswa);
app.patch("/:id", controller.updateMahasiswaName);
module.exports = app;
