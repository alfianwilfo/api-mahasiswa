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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ControllerMahasiswa;
