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
      let validation = new Validator(
        { nama },
        { nama: "required|regex:/^[a-zA-Z0-9]*$/|min:3" },
        {
          required: "Nama matkul can't empty",
          regex: "Nama matkul can only filled with character and number",
          min: "Nama matkul length character must be at least 3 character",
        }
      );

      async function passes() {
        try {
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
      function fails() {
        let msg = validation.errors.first("nama");
        throw { msg };
      }
      validation.checkAsync(passes, fails);
    } catch (error) {
      if (error.msg) {
        res.status(401).json({ message: error.msg });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async updateMatkulName(req, res) {
    try {
      let { nama } = req.body;
      let { id } = req.params;
      let validateNama = new Validator(
        { nama },
        { nama: `required|regex:/^[a-zA-Z0-9 ]+$/|min:3` },
        {
          required: "Nama matkul can't empty",
          regex:
            "Nama matkul can only filled with character, number, and space",
          min: "Nama matkul length character must be at least 3 character",
        }
      );

      validateNama.checkAsync(
        async () => {
          try {
            let createdMatkul = await Matkul.update(
              { nama },
              { where: { id } }
            );
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
        },
        () => {
          let msg = validateNama.errors.first("nama");
          throw { msg };
        }
      );
    } catch (error) {
      if (error.msg) {
        console.log(error, "??");
      }
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
