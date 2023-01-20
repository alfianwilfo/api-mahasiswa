let { RencanaStudi } = require("../models/");
class ControllerStudi {
  static async getAll(req, res) {
    try {
      console.log("MASUK");
      let data = await RencanaStudi.findAll();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = ControllerStudi;
