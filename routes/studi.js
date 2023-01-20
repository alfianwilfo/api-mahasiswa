const express = require("express");
const studi = require("../controllers/rencanaStudi");
const app = express();

app.get("/", studi.getAll);
app.post("/", studi.createRencanaStudi);
app.patch("/:id", studi.updateRencanaMatkul);
app.delete("/:id", studi.deleteRencanaStudi);

module.exports = app;
