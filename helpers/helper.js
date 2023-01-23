let Validator = require("validatorjs");
// let check = await isInputValid({ nama });
let { Matkul } = require("../models/");

let isInputValid = (data) => {
  let { nama } = data;
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

  if (validation.fails()) {
    return {
      name: "validator",
      status: 400,
      msg: validation.errors.first("nama"),
    }; // The first name field is required.
  } else {
    return true;
  }
};

let isMatkulExist = async (id) => {
  let findedMatkul = await Matkul.findByPk(id);
  let validation = new Validator(
    { findedMatkul },
    { findedMatkul: "required" },
    { required: "Matkul not found" }
  );
  if (validation.fails()) {
    return {
      name: "validator",
      status: 400,
      msg: validation.errors.first("findedMatkul"),
    }; // The first name field is required.
  } else {
    return true;
  }
};

module.exports = { isInputValid, isMatkulExist };
