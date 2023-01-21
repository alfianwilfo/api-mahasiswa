const express = require("express");
const app = express();
const controller = require("../controllers/mahasiswa");
const {
  checkRequestMahasiswa,
  checkMahasiswa,
} = require("../middlewares/authentication");

app.get("/", controller.getAll);
app.post("/", checkRequestMahasiswa, controller.createMahasiswa);
app.get("/:id", controller.findById);
app.delete("/:id", checkMahasiswa, controller.deleteMahasiswa);
app.patch(
  "/:id",
  checkMahasiswa,
  checkRequestMahasiswa,
  controller.updateMahasiswaName
);
module.exports = app;
