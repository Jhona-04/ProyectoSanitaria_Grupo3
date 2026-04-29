const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Rol extends Model {}

Rol.init(
  {
    idRol: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "El nombre del rol no puede estar vacío.",
        },
        len: {
          args: [2, 50],
          msg: "El nombre del rol debe tener entre 2 y 50 caracteres.",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = Rol;
