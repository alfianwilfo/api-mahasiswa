const express = require("express");
const matkul = require("../controllers/matkul");
const app = express();
const {
  checkMatkul,
  checkInputNamaMatkul,
} = require("../middlewares/authentication");

app
  .get("/", matkul.getAll)
  .delete("/:id", checkMatkul, matkul.deleteMatkul)
  .use(checkInputNamaMatkul)
  .post("/", matkul.createMatkul)
  .patch("/:id", checkMatkul, matkul.updateMatkulName);

module.exports = app;
