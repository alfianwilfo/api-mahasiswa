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
      let id = req.params.id;

      let data = await Mahasiswa.findByPk(id);
      res.json(data);
    } catch (error) {
      console.log(error, "??");
    }
  }

  static async createMahasiswa(req, res) {
    try {
      let { nama } = req.body;
      let validation = new Validator({ nama: nama }, { id: "required" });

      let createdMahasiswa = await Mahasiswa.create({ nama });
      res.status(201).json({
        message: `${nama} berhasil ditambahkan kedalam database dan mendapatkan id ${createdMahasiswa.id}`,
      });
    } catch (error) {
      console.log(error);
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
