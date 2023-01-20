let { Matkul } = require("../models/");
class ControllerMatkul {
  static async getAll(req, res) {
    try {
      let data = await Matkul.findAll();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async createMatkul(req, res) {
    try {
      let { nama } = req.body;
      let createdMatkul = await Matkul.create({ nama });
      res.status(201).json({
        message: `Matkul ${nama} berhasil dimasukkan kedalam database dan mendapatkan id ${createdMatkul.id}`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateMatkulName(req, res) {
    try {
      let { nama } = req.body;
      let { id } = req.params;
      let updatedMatkul = await Matkul.update({ nama }, { where: { id } });
      res.json({ message: "Nama matkul berhasil di update" });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMatkul(req, res) {
    try {
      let { id } = req.params;
      let deletedMatkul = await Matkul.destroy({ where: { id } });
      res.json({ message: "Matkul berhasil di delete" });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ControllerMatkul;
