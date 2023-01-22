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
      RencanaStudi.belongsTo(models.Matkul, { foreignKey: "IdMatkul" });
      RencanaStudi.belongsTo(models.Mahasiswa, { foreignKey: "IdMahasiswa" });
    }
  }
  RencanaStudi.init(
    {
      IdMahasiswa: {
        type: DataTypes.INTEGER,
        references: {
          model: "Mahasiswas",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      IdMatkul: {
        type: DataTypes.INTEGER,
        references: {
          model: "Matkuls",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "RencanaStudi",
    }
  );
  return RencanaStudi;
};
