const express = require("express");
const app = express();
const controller = require("../controllers/mahasiswa");
const {
  checkInputNamaMahasiswa,
  checkMahasiswa,
} = require("../middlewares/authentication");

app
  .get("/", controller.getAll)
  .get("/:id", checkMahasiswa, controller.findById)
  .delete("/:id", checkMahasiswa, controller.deleteMahasiswa)
  .use(checkInputNamaMahasiswa)
  .post("/", controller.createMahasiswa)
  .patch("/:id", checkMahasiswa, controller.updateMahasiswaName);
module.exports = app;
