let { Mahasiswa } = require("../models/index");
class ControllerMahasiswa {
  static async getAll(req, res) {
    try {
      console.log(Mahasiswa);
      let data = await Mahasiswa.findAll();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ControllerMahasiswa;
