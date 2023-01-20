"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RencanaStudi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RencanaStudi.init(
    {
      IdMahasiswa: { type: DataTypes.INTEGER },
      IdMatkul: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "RencanaStudi",
    }
  );
  return RencanaStudi;
};
