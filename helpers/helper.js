let Validator = require("validatorjs");
// let check = await isInputValid({ nama });
let { Matkul, Mahasiswa, RencanaStudi } = require("../models/");

let isInputValid = (data) => {
  let { nama, matkul } = data;
  console.log(data, "??");
  let from;
  let val;
  let rules;
  let msg;
  if (nama || nama === "") {
    from = "nama";
    val = { nama };
    rules = { nama: `required|regex:^[a-zA-Z]+[a-zA-Z-]*$` };
    msg = {
      required: "Nama mahasiswa can't empty",
      regex: "Invalid nama mahasiswa",
    };
  } else {
    from = "matkul";
    val = { matkul };

    rules = { matkul: `required|regex:/^[a-zA-Z0-9 ]+$/|min:3` };
    msg = {
      required: "Nama matkul can't empty",
      regex:
        "Nama matkul can only filled with character, number and white space",
      min: "Nama matkul length character must be at least 3 character",
    };
  }

  let validation = new Validator(val, rules, msg);

  if (validation.fails()) {
    return {
      name: "validator",
      status: 400,
      msg: validation.errors.first(from),
    };
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
    };
  } else {
    return true;
  }
};
let isMahasiswaExist = async (id) => {
  let findedMahasiswa = await Mahasiswa.findByPk(id);
  let validateFindedMahasiswa = new Validator(
    { findedMahasiswa },
    { findedMahasiswa: "required" },
    { required: "Mahasiswa not found" }
  );

  if (validateFindedMahasiswa.fails()) {
    return {
      name: "validator",
      status: 404,
      msg: validateFindedMahasiswa.errors.first("findedMahasiswa"),
    };
  } else {
    return true;
  }
};

let isInputIdValid = async (data) => {
  let validateId = new Validator(
    data,
    {
      IdMahasiswa: "min:1",
      IdMatkul: "min:1",
    },
    {
      min: "Invalid format :attribute",
    }
  );
  if (validateId.fails()) {
    if (validateId.errors.first("IdMahasiswa")) {
      return {
        name: "validator",
        status: 400,
        msg: validateId.errors.first("IdMahasiswa"),
      };
    } else {
      return {
        name: "validator",
        status: 400,
        msg: validateId.errors.first("IdMatkul"),
      };
    }
  } else {
    return true;
  }
};

let isAlreadyPicked = async (data) => {
  let { IdMatkul, IdMahasiswa } = data;
  let isTrue = await RencanaStudi.findOne({
    where: { IdMatkul, IdMahasiswa },
  });
  if (!isTrue) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  isInputValid,
  isMatkulExist,
  isMahasiswaExist,
  isInputIdValid,
  isAlreadyPicked,
};
