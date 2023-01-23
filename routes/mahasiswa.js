const express = require("express");
const app = express();
const controller = require("../controllers/mahasiswa");
const {
  checkInputNamaMahasiswa,
  checkMahasiswa,
} = require("../middlewares/authentication");

app.get("/", controller.getAll);
app.post("/", checkInputNamaMahasiswa, controller.createMahasiswa);
app.get("/:id", checkMahasiswa, controller.findById);
app.delete("/:id", checkMahasiswa, controller.deleteMahasiswa);
app.patch(
  "/:id",
  checkMahasiswa,
  checkInputNamaMahasiswa,
  controller.updateMahasiswaName
);
module.exports = app;
