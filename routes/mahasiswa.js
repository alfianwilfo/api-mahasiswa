const express = require("express");
const app = express();
const controller = require("../controllers/mahasiswa");
const {
  checkInputNamaMahasiswa,
  checkMahasiswa,
} = require("../middlewares/authentication");

app.get("/", controller.getAll);
app.get("/:id", checkMahasiswa, controller.findById);
app.delete("/:id", checkMahasiswa, controller.deleteMahasiswa);
app.use(checkInputNamaMahasiswa);
app.post("/", controller.createMahasiswa);
app.patch("/:id", checkMahasiswa, controller.updateMahasiswaName);
module.exports = app;
