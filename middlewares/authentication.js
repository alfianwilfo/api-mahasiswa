let Validator = require("validatorjs");
let { Matkul, Mahasiswa, RencanaStudi } = require("../models/");
let {
  isInputValid,
  isMatkulExist,
  isMahasiswaExist,
  isInputIdValid,
  isAlreadyPicked,
  checkMatkulMahasiswa,
  checkQuotaMatkul,
  isRencanaStudiExist,
} = require("../helpers/helper");
let checkMatkul = async (req, res, next) => {
  try {
    let { id } = req.params;
    let findMatkul = await isMatkulExist(id);
    if (typeof findMatkul === "object") {
      throw findMatkul;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

let checkInputNamaMatkul = async (req, res, next) => {
  try {
    let { nama } = req.body;
    let checkInput = await isInputValid({ matkul: nama });
    if (typeof checkInput === "object") {
      throw checkInput;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

let checkInputNamaMahasiswa = async (req, res, next) => {
  try {
    let { nama } = req.body;
    let checkInput = await isInputValid({ nama });
    if (typeof checkInput === "object") {
      throw checkInput;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

let checkMahasiswa = async (req, res, next) => {
  try {
    let { id } = req.params;
    let checkMhs = await isMahasiswaExist(id);
    if (typeof checkMhs === "object") {
      throw checkMhs;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

let checkInputForStudi = async (req, res, next) => {
  try {
    let IdMahasiswa = +req.body.IdMahasiswa;
    let IdMatkul = +req.body.IdMatkul;
    let validateInput = await isInputIdValid({ IdMahasiswa, IdMatkul });
    if (typeof validateInput === "object") {
      throw validateInput;
    } else {
      let findMahasiswa = await isMahasiswaExist(IdMahasiswa);
      if (typeof findMahasiswa === "object") {
        throw findMahasiswa;
      } else {
        let findMatkul = await isMatkulExist(IdMatkul);
        if (typeof findMatkul === "object") {
          throw findMatkul;
        } else {
          let checkingAlreadyPickedOrNot = await isAlreadyPicked({
            IdMahasiswa,
            IdMatkul,
          });
          if (!checkingAlreadyPickedOrNot) {
            next();
          } else {
            throw {
              name: "validator",
              status: 400,
              msg: "You already pick this Matkul",
            };
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

let checkQuota = async (req, res, next) => {
  try {
    let IdMahasiswa = +req.body.IdMahasiswa;
    let countMatkulMahasiswa = await checkMatkulMahasiswa(IdMahasiswa);
    if (typeof countMatkulMahasiswa === "object") {
      throw countMatkulMahasiswa;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

let countMatkulSelector = async (req, res, next) => {
  try {
    let IdMatkul = +req.body.IdMatkul;
    let findMatkul = await isMatkulExist(IdMatkul);
    if (typeof findMatkul === "object") {
      throw findMatkul;
    } else {
      let countQuota = await checkQuotaMatkul(IdMatkul);
      if (typeof countQuota === "object") {
        throw countQuota;
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

let findRencanaStudi = async (req, res, next) => {
  try {
    let { id } = req.params;
    let isExist = await isRencanaStudiExist(id);
    if (typeof isExist === "object") {
      throw isExist;
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkMatkul,
  checkInputNamaMatkul,
  checkInputNamaMahasiswa,
  checkMahasiswa,
  checkInputForStudi,
  checkQuota,
  countMatkulSelector,
  findRencanaStudi,
};
