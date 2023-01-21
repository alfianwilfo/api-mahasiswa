let Validator = require("validatorjs");
let { Matkul, Mahasiswa } = require("../models/");
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
        throw { name: "validator", status: 404, msg: msg };
      }
    );
  } catch (error) {
    next(error);
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
        throw { name: "validator", status: 401, msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

let checkRequestMahasiswa = (req, res, next) => {
  try {
    let { nama } = req.body;
    let validator = new Validator(
      {
        nama,
      },
      {
        nama: `required|regex:^[a-zA-Z]+[a-zA-Z-]*$`,
      },
      {
        required: "You forgot to give a :attribute",
        regex: ":attribute format invalid",
      }
    );
    validator.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validator.errors.first("nama");
        throw { status: 401, name: "validator", msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

let checkMahasiswa = async (req, res, next) => {
  try {
    let { id } = req.params;
    let findedMahasiswa = await Mahasiswa.findByPk(id);
    let validateFindedMahasiswa = new Validator(
      { findedMahasiswa },
      { findedMahasiswa: "required" },
      { required: "Mahasiswa not found" }
    );

    // console.log(validateFindedMahasiswa);

    validateFindedMahasiswa.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validateFindedMahasiswa.errors.first("findedMahasiswa");
        throw { name: "validator", status: 401, msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

let checkInputForStudi = async (req, res, next) => {
  try {
    let IdMahasiswa = +req.body.IdMahasiswa;
    let IdMatkul = +req.body.IdMatkul;
    let validateId = new Validator(
      {
        IdMahasiswa,
        IdMatkul,
      },
      {
        IdMahasiswa: "min:1",
        IdMatkul: "min:1",
      },
      {
        min: "Invalid format :attribute",
      }
    );
    validateId.checkAsync(
      () => {
        next();
      },
      () => {
        let msg =
          validateId.errors.first("IdMahasiswa") ||
          validateId.errors.first("IdMatkul");
        throw { name: "validator", status: 401, msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkMatkul,
  checkRequestMatkul,
  checkRequestMahasiswa,
  checkMahasiswa,
  checkInputForStudi,
};
