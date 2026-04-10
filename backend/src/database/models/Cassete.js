const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Cassete extends Model {}

Cassete.init(
  {
    idCassete: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    observaciones: {
      type: DataTypes.STRING(100),
      validate: {
        notEmpty: {
          msg: "La observación.",
        },
        len: {
          args: [2, 100],
          msg: "La observación del cassete debe tener entre 2 y 100 caracteres",
        },
      },
    },

    direccion: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La dirección no puede estar vacía.",
        },
        len: {
          args: [5, 150],
          msg: "La dirección de la agencia debe tener entre 5 y 150 caracteres",
        },
      },
    },

    telefono: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: {
        msg: "El teléfono ya está registrado.",
      },
      validate: {
        notEmpty: {
          msg: "El teléfono no puede estar vacío.",
        },
        is: {
          args: [/^[6789][0-9]{8}$/],
          msg: "El teléfono no tiene un formato válido.",
        },
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
          msg: "El email ya está registrado.",
        },
        validate: {
          isEmail: {
            msg: "El email no tiene un formato válido.",
          },
          len: {
            args: [5, 100],
            msg: "El email debe tener entre 5 y 100 caracteres",
          },
          noDoubleDotOrSpaces(value) {
            if (value.includes(" ") || value.includes("..")) {
              throw new Error("El email no es correcto.");
            }
          },
        },
      },
    },
  },
  {
    sequelize,
    tableName: "cassetes",
    timestamps: false,
  },
);

module.exports = Cassete;