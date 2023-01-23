const express = require("express");
const studi = require("../controllers/rencanaStudi");
const app = express();
let {
  checkInputForStudi,
  checkQuota,
  countMatkulSelector,
  findRencanaStudi,
} = require("../middlewares/authentication");

app
  .get("/", studi.getAll)
  .delete("/:id", findRencanaStudi, studi.deleteRencanaStudi)
  .use(checkInputForStudi)
  .use(countMatkulSelector)
  .post("/", checkQuota, studi.createRencanaStudi)
  .patch("/:id", findRencanaStudi, studi.updateRencanaMatkul);

module.exports = app;
