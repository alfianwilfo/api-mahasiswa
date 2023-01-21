let { Mahasiswa } = require("../models/index");
let Validator = require("validatorjs");
class ControllerMahasiswa {
  static async getAll(req, res, next) {
    try {
      let data = await Mahasiswa.findAll();
      res.json(data);
    } catch (error) {
      next(error);
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

      res.json({ message: "Berhasil menghapus mahasiswa" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateMahasiswaName(req, res) {
    try {
      let { id } = req.params;
      let { nama } = req.body;
      let updatedMahasiswa = await Mahasiswa.update(
        { nama },
        { where: { id } }
      );
      res.json({ message: "Success update nama mahasiswa" });
      // res.json({ message: "Nama mahasiswa berhasil di update" });
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
