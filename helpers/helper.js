let Validator = require("validatorjs");
// let check = await isInputValid({ nama });
let { Matkul, Mahasiswa, RencanaStudi } = require("../models/");

let isInputValid = (data) => {
  let { nama, matkul } = data;
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
      regex: "Format nama mahasiswa invalid",
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
      status: 404,
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

let checkMatkulMahasiswa = async (IdMahasiswa) => {
  let countMatkulMahasiswa = await RencanaStudi.count({
    where: { IdMahasiswa },
  });
  let validateCount = new Validator(
    { countMatkulMahasiswa },
    { countMatkulMahasiswa: "between:0,2" },
    { between: "Your rencana studi has reached limit" }
  );
  if (validateCount.fails()) {
    throw {
      name: "validator",
      status: 400,
      msg: validateCount.errors.first("countMatkulMahasiswa"),
    };
  } else {
    return true;
  }
};

let checkQuotaMatkul = async (IdMatkul) => {
  let countQuota = await RencanaStudi.count({
    where: { IdMatkul },
  });
  let validate = new Validator(
    { countQuota },
    { countQuota: "max:3" },
    { max: "This matkul full booked" }
  );

  if (validate.fails()) {
    throw {
      name: "validator",
      status: 400,
      msg: validate.errors.first("countQuota"),
    };
  } else {
    return true;
  }
};

let isRencanaStudiExist = async (id) => {
  let findRencanaStudi = await RencanaStudi.findByPk(id);
  let validate = new Validator(
    { findRencanaStudi },
    { findRencanaStudi: "required" },
    { required: "Rencana studi not found" }
  );
  if (validate.fails()) {
    return {
      name: "validator",
      status: 404,
      msg: validate.errors.first("findRencanaStudi"),
    };
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
  checkMatkulMahasiswa,
  checkQuotaMatkul,
  isRencanaStudiExist,
};
