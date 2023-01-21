let Validator = require("validatorjs");
let { Matkul } = require("../models/");
let authenticationMatkul = async (req, res, next) => {
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

module.exports = { authenticationMatkul };
