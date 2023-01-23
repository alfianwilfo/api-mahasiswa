let Validator = require("validatorjs");
let { Matkul, Mahasiswa, RencanaStudi } = require("../models/");
let {
  isInputValid,
  isMatkulExist,
  isMahasiswaExist,
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
    let findMatkul = await Matkul.findByPk(IdMatkul);
    if (!findMatkul) {
      throw { name: "validator", status: 404, msg: "Matkul not found" };
    }
    let countMatkulSelector = await RencanaStudi.count({
      where: { IdMatkul },
    });

    let validate = new Validator(
      { countMatkulSelector },
      { countMatkulSelector: "max:3" },
      { max: "This matkul full booked" }
    );

    validate.checkAsync(
      () => {
        next();
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

    if (!findedRencanaStudi) {
      throw {
        name: "validator",
        status: 404,
        msg: "Rencana studi not found",
      };
    } else {
      if (findedRencanaStudi.IdMatkul === +req.body.IdMatkul) {
        throw {
          name: "validator",
          status: 400,
          msg: "You already pick this matkul",
        };
      }
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

let findRencana = async (req, res, next) => {
  try {
    let { id } = req.params;
    let findedRencanaStudi = await RencanaStudi.findByPk(id);
    let validate = new Validator(
      { findedRencanaStudi },
      { findedRencanaStudi: "required" },
      { required: "Rencana studi not found" }
    );
    validate.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validate.errors.first("findedRencanaStudi");
        throw { name: "validator", status: 404, msg };
      }
    );
  } catch (error) {
    next(error);
  }
};

let validateInputForPatchStudi = async (req, res, next) => {
  try {
    let IdMatkul = req.body.IdMatkul;
    let validate = new Validator(
      { IdMatkul },
      { IdMatkul: "required|numeric" },
      { numeric: "Invalid IdMatkul format", required: "IdMatkul can't empty" }
    );
    validate.checkAsync(
      () => {
        next();
      },
      () => {
        let msg = validate.errors.first("IdMatkul");
        throw { name: "validator", status: 400, msg };
      }
    );
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
  findRencana,
  validateInputForPatchStudi,
};
