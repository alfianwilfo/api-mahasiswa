let Validator = require("validatorjs");
let { Matkul } = require("../models/");
class ControllerMatkul {
  static async getAll(req, res, next) {
    try {
      let data = await Matkul.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        order: [["id"]],
      });
      res.json(data);
    } catch (error) {
      next();
    }
  }
  static async createMatkul(req, res, next) {
    try {
      let { nama } = req.body;
      let createdMatkul = await Matkul.create({ nama });

      res.status(201).json({
        message: `Success create new matkul`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateMatkulName(req, res, next) {
    try {
      let { nama } = req.body;
      let { id } = req.params;
      let createdMatkul = await Matkul.update({ nama }, { where: { id } });
      res.status(201).json({
        message: `Success update Nama matkul`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMatkul(req, res) {
    try {
      let { id } = req.params;
      let deletedMatkul = await Matkul.destroy({ where: { id } });
      res.json({ message: "Matkul berhasil di delete" });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = ControllerMatkul;
