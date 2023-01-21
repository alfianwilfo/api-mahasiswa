let { Mahasiswa } = require("../models/index");
let Validator = require("validatorjs");
class ControllerMahasiswa {
  static async getAll(req, res) {
    try {
      let data = await Mahasiswa.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async findById(req, res) {
    try {
      let id = +req.params.id;
      let data = await Mahasiswa.findByPk(id);
      let input = { data: data };
      let rules = { data: "required" };

      let validation = new Validator(input, rules, {
        required: "Mahasiswa tidak ditemukan",
      });
      validation.checkAsync(
        () => {
          res.json(data);
        },
        () => {
          let msg = validation.errors.first("data");
          throw { msg };
        }
      );
    } catch (error) {
      if (error.msg) {
        res.status(400).json({ message: error.msg });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async createMahasiswa(req, res) {
    try {
      let { nama } = req.body;
      let createdMahasiswa = await Mahasiswa.create({ nama });
      res.status(201).json({
        message: `${nama} berhasil ditambahkan kedalam database dan mendapatkan id ${createdMahasiswa.id}`,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteMahasiswa(req, res) {
    try {
      let { id } = req.params;
      let deleteMahasiswa = await Mahasiswa.destroy({ where: { id } });
      let validator = new Validator(
        {
          deleteMahasiswa,
        },
        {
          deleteMahasiswa: "accepted",
        },
        {
          accepted: `Mahasiswa not found`,
        }
      );
      validator.checkAsync(passes, fails);

      function fails() {
        let msg = validator.errors.first("deleteMahasiswa");
        throw { msg };
      }
      async function passes() {
        res.json({ message: "Berhasil menghapus mahasiswa" });
      }
    } catch (error) {
      if (error.msg) {
        res.status(404).json({ message: error.msg });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async updateMahasiswaName(req, res) {
    try {
      let { id } = req.params;
      let { nama } = req.body;

      // res.json({ message: "Nama mahasiswa berhasil di update" });
      let findMahasiswa = await Mahasiswa.findByPk(id);

      let val = new Validator(
        {
          findMahasiswa,
        },
        {
          findMahasiswa: "required",
        },
        {
          required: "Mahasiswa not found",
        }
      );
      val.checkAsync(passFind, failsFind);

      function passFind() {
        let validator = new Validator(
          {
            nama,
          },
          {
            nama: "required|regex:/^[a-zA-Z]*$/|min:3",
          },
          {
            required: "You forgot to give a :attribute",
            regex: ":attribute format invalid",
            min: ":attribute length minimum 3 character",
          }
        );
        function fails() {
          let msg = validator.errors.first("nama");
          throw { msg };
        }
        async function passes() {
          let updatedMahasiswa = await Mahasiswa.update(
            { nama },
            { where: { id } }
          );

          let validateUpdate = new Validator(
            {
              updatedMahasiswa: updatedMahasiswa[0],
            },
            {
              updatedMahasiswa: "accepted",
            },
            { accepted: "Fail to update nama mahasiswa" }
          );
          validateUpdate.checkAsync(passesUpdate, failsUpdate);
          function passesUpdate() {
            // Validation passed
            res.json({ message: "Success update nama mahasiswa" });
          }

          function failsUpdate() {
            let msg = validator.errors.first("updatedMahasiswa");
            throw { msg };
          }
        }
        validator.checkAsync(passes, fails);
      }

      function failsFind(params) {
        let msg = val.errors.first("findMahasiswa");
        throw { msg };
      }
    } catch (error) {
      if (error.msg) {
        res.status(404).json({ message: error.msg });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = ControllerMahasiswa;
