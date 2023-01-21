const express = require("express");
const matkul = require("../controllers/matkul");
const app = express();
const { checkMatkul } = require("../middlewares/authentication");

app.get("/", matkul.getAll);
app.post("/", matkul.createMatkul);
app.patch("/:id", checkMatkul, matkul.updateMatkulName);
app.delete("/:id", matkul.deleteMatkul);

module.exports = app;
