let Validator = require("validatorjs");
let { Matkul } = require("../models/");
let checkMatkul = async (req, res, next) => {
  try {
    let { id } = req.params;
    let findedMatkul = await Matkul.findByPk(id);
    let validation = new Validator(
      { findedMatkul },
      { findedMatkul: "required" },
      { required: "Matkul not found" }
    );
    validation.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validation.errors.first("findedMatkul");
        throw { msg: msg };
      }
    );
  } catch (error) {
    res.status(404).json({ message: error.msg });
  }
};

let checkRequestMatkul = async (req, res, next) => {
  try {
    let { nama } = req.body;
    let validation = new Validator(
      { nama },
      { nama: `required|regex:/^[a-zA-Z0-9 ]+$/|min:3` },
      {
        required: "Nama matkul can't empty",
        regex:
          "Nama matkul can only filled with character, number and white space",
        min: "Nama matkul length character must be at least 3 character",
      }
    );
    validation.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validation.errors.first("nama");
        throw { msg };
      }
    );
  } catch (error) {
    if (error.msg) {
      res.status(401).json({ message: error.msg });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = { checkMatkul, checkRequestMatkul };
