let { Mahasiswa, RencanaStudi, Matkul } = require("../models/index");
let Validator = require("validatorjs");
class ControllerMahasiswa {
  static async getAll(req, res, next) {
    try {
      let data = await Mahasiswa.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findById(req, res, next) {
    try {
      let id = +req.params.id;
      let data = await Mahasiswa.findByPk(id, {
        include: [
          {
            model: RencanaStudi,
            include: [
              {
                model: Matkul,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
            attributes: {
              exclude: ["createdAt", "updatedAt", "IdMahasiswa", "IdMatkul"],
            },
            as: "Rencana_Studi",
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });

      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createMahasiswa(req, res) {
    try {
      let { nama } = req.body;
      let createdMahasiswa = await Mahasiswa.create({ nama });
      res
        .status(201)
        .json({ id: createdMahasiswa.id, nama: createdMahasiswa.nama });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMahasiswa(req, res) {
    try {
      let { id } = req.params;
      let deleteMahasiswa = await Mahasiswa.destroy({ where: { id } });

      res.json({ message: "Success delete mahasiswa" });
    } catch (error) {
      next(error);
    }
  }

  static async updateMahasiswaName(req, res, next) {
    try {
      let { id } = req.params;
      let { nama } = req.body;
      let updatedMahasiswa = await Mahasiswa.update(
        { nama },
        { where: { id } }
      );
      res.json({ message: "Success update nama mahasiswa" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerMahasiswa;
