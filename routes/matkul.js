const express = require("express");
const matkul = require("../controllers/matkul");
const app = express();

app.get("/", matkul.getAll);
app.post("/", matkul.createMatkul);
app.patch("/:id", matkul.updateMatkulName);
app.delete("/:id", matkul.deleteMatkul);

module.exports = app;
