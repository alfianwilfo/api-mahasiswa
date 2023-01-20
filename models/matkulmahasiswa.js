'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MatkulMahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MatkulMahasiswa.init({
    matkul: DataTypes.INTEGER,
    mahasiswa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MatkulMahasiswa',
  });
  return MatkulMahasiswa;
};