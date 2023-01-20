let { Mahasiswa } = require("../models/index");
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
      let { id } = req.params;
      let data = await Mahasiswa.findByPk(id);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async createMahasiswa(req, res) {
    try {
      let { nama } = req.body;
      let createdMahasiswa = await Mahasiswa.create({ nama });
      res
        .status(201)
        .json({
          message: `${nama} berhasil ditambahkan kedalam database dan mendapatkan id ${createdMahasiswa.id}`,
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ControllerMahasiswa;
