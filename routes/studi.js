const express = require("express");
const studi = require("../controllers/rencanaStudi");
const app = express();
let {
  checkInputForStudi,
  checkQuota,
  countMatkulSelector,
} = require("../middlewares/authentication");

app.get("/", studi.getAll);
app.post(
  "/",
  checkInputForStudi,
  checkQuota,
  countMatkulSelector,
  studi.createRencanaStudi
);
app.patch("/:id", studi.updateRencanaMatkul);
app.delete("/:id", studi.deleteRencanaStudi);

module.exports = app;
