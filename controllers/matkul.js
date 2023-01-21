let Validator = require("validatorjs");
let { Matkul } = require("../models/");
class ControllerMatkul {
  static async getAll(req, res) {
    try {
      let data = await Matkul.findAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
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
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async updateMatkulName(req, res) {
    try {
      let { nama } = req.body;
      let { id } = req.params;
      let createdMatkul = await Matkul.update({ nama }, { where: { id } });
      res.status(201).json({
        message: `Success update Nama matkul`,
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async deleteMatkul(req, res) {
    try {
      let { id } = req.params;
      let deletedMatkul = await Matkul.destroy({ where: { id } });
      res.json({ message: "Matkul berhasil di delete" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = ControllerMatkul;
