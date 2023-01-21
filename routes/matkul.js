const express = require("express");
const matkul = require("../controllers/matkul");
const app = express();
const {
  checkMatkul,
  checkRequestMatkul,
} = require("../middlewares/authentication");

app.get("/", matkul.getAll);
app.post("/", checkRequestMatkul, matkul.createMatkul);
app.patch("/:id", checkMatkul, checkRequestMatkul, matkul.updateMatkulName);
app.delete("/:id", checkMatkul, matkul.deleteMatkul);

module.exports = app;
