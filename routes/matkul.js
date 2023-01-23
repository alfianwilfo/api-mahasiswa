const express = require("express");
const matkul = require("../controllers/matkul");
const app = express();
const {
  checkMatkul,
  checkInputName,
} = require("../middlewares/authentication");

app.get("/", matkul.getAll);
app.delete("/:id", checkMatkul, matkul.deleteMatkul);
app.use(checkInputName);
app.post("/", matkul.createMatkul);
app.patch("/:id", checkMatkul, matkul.updateMatkulName);

module.exports = app;
