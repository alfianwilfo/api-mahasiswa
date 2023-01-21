const express = require("express");
const studi = require("../controllers/rencanaStudi");
const app = express();
let { checkInputForStudi } = require("../middlewares/authentication");

app.get("/", studi.getAll);
app.post("/", checkInputForStudi, studi.createRencanaStudi);
app.patch("/:id", studi.updateRencanaMatkul);
app.delete("/:id", studi.deleteRencanaStudi);

module.exports = app;
