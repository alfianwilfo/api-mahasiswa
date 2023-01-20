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
}
module.exports = ControllerMatkul;
