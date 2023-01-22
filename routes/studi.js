const express = require("express");
const studi = require("../controllers/rencanaStudi");
const app = express();
let {
  checkInputForStudi,
  checkQuota,
  countMatkulSelector,
  findRencanaStudi,
  findRencana,
  validateInputForPatchStudi,
} = require("../middlewares/authentication");

app.get("/", studi.getAll);
app.post(
  "/",
  checkInputForStudi,
  checkQuota,
  countMatkulSelector,
  studi.createRencanaStudi
);
app.patch(
  "/:id",
  validateInputForPatchStudi,
  findRencanaStudi,
  countMatkulSelector,

  studi.updateRencanaMatkul
);
app.delete("/:id", findRencana, studi.deleteRencanaStudi);

module.exports = app;
