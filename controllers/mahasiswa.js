let { Mahasiswa } = require("../models/index");
let Validator = require("validatorjs");
class ControllerMahasiswa {
  static async getAll(req, res) {
    try {
      let data = await Mahasiswa.findAll();
      res.json(data);
    } catch (error) {
      console.log(error);
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
      function passes() {
        res.json(data);
      }
      function fails() {
        let msg = validation.errors.first("data");
        throw { msg };
      }
      validation.checkAsync(passes, fails);
      res.json(data);
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
      let validator = new Validator(
        {
          nama,
        },
        {
          nama: "required|min:3|regex:/^[a-zA-Z]*$/",
        }
      );
      function fails() {
        let msg = validator.errors.first("nama");
        throw { msg };
      }
      async function passes() {
        let createdMahasiswa = await Mahasiswa.create({ nama });
        res.status(201).json({
          message: `${nama} berhasil ditambahkan kedalam database dan mendapatkan id ${createdMahasiswa.id}`,
        });
      }
      validator.checkAsync(passes, fails);
    } catch (error) {
      if (error.msg) {
        res.status(400).json({ message: error.msg });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async deleteMahasiswa(req, res) {
    try {
      let { id } = req.params;
      let updatedMahasiswa = await Mahasiswa.destroy({ where: { id } });
      res.json({ message: "Mahasiswa Berhasil dihapus dari database" });
    } catch (error) {
      console.log(error);
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
      res.json({ message: "Nama mahasiswa berhasil di update" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ControllerMahasiswa;
