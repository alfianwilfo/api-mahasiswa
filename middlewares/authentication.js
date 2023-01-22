let Validator = require("validatorjs");
let { Matkul, Mahasiswa, RencanaStudi } = require("../models/");
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
        throw { name: "validator", status: 400, msg };
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
        throw { status: 400, name: "validator", msg };
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

    validateFindedMahasiswa.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validateFindedMahasiswa.errors.first("findedMahasiswa");
        throw { name: "validator", status: 404, msg };
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
      async () => {
        try {
          let findedMahasiswa = await Mahasiswa.findByPk(IdMahasiswa);
          if (!findedMahasiswa) {
            throw {
              name: "validator",
              status: 404,
              msg: "Mahasiswa not found",
            };
          }
          let findedMatkul = await Matkul.findByPk(IdMatkul);
          if (!findedMatkul) {
            throw {
              name: "validator",
              status: 404,
              msg: "Matkul not found",
            };
          }
          let isAlreadyPicked = await RencanaStudi.findOne({
            where: { IdMatkul, IdMahasiswa },
          });
          if (!isAlreadyPicked) {
            next();
          } else {
            throw {
              name: "validator",
              status: 400,
              msg: "You already pick this matkul",
            };
          }
        } catch (error) {
          next(error);
        }
      },
      () => {
        let msg =
          validateId.errors.first("IdMahasiswa") ||
          validateId.errors.first("IdMatkul");
        throw { name: "validator", status: 400, msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

let checkQuota = async (req, res, next) => {
  try {
    let IdMahasiswa = +req.body.IdMahasiswa;

    let countMatkulMahasiswa = await RencanaStudi.count({
      where: { IdMahasiswa },
    });
    let validateCount = new Validator(
      { countMatkulMahasiswa },
      { countMatkulMahasiswa: "between:0,2" },
      { between: "Your rencana studi has reached limit" }
    );
    validateCount.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validateCount.errors.first("countMatkulMahasiswa");
        throw { name: "validator", status: 400, msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

let countMatkulSelector = async (req, res, next) => {
  try {
    let IdMatkul = +req.body.IdMatkul;
    let countMatkulSelector = await RencanaStudi.count({
      where: { IdMatkul },
    });
    let validate = new Validator(
      { countMatkulSelector },
      { countMatkulSelector: "max:3" },
      { max: "Matkul selector has reached limit" }
    );

    validate.checkAsync(
      () => {
        next();
        console.log("masuk");
      },
      () => {
        let msg = validate.errors.first("countMatkulSelector");
        throw { name: "validator", status: 400, msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

let findRencanaStudi = async (req, res, next) => {
  try {
    let { id } = req.params;

    let findedRencanaStudi = await RencanaStudi.findByPk(id);
    if (findedRencanaStudi.IdMatkul === +req.body.IdMatkul) {
      throw {
        name: "validator",
        status: 400,
        msg: "You already pick this matkul",
      };
    } else {
      let validate = new Validator(
        { findedRencanaStudi },
        { findedRencanaStudi: "required" },
        { required: "Rencana studi not found" }
      );
      validate.checkAsync(
        () => {
          req.idMatkulRencanaStudi = findedRencanaStudi.IdMatkul;
          next();
        },
        () => {
          let msg = validate.errors.first("findedRencanaStudi");
          throw { name: "validator", status: 404, msg };
        }
      );
    }
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
  checkQuota,
  countMatkulSelector,
  findRencanaStudi,
};
