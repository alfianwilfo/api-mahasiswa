const express = require("express");
const matkul = require("../controllers/matkul");
const app = express();
const { authenticationMatkul } = require("../middlewares/authentication");

app.get("/", matkul.getAll);
app.post("/", matkul.createMatkul);
app.patch("/:id", authenticationMatkul, matkul.updateMatkulName);
app.delete("/:id", matkul.deleteMatkul);

module.exports = app;
