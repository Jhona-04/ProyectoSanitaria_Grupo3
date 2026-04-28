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

    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La fecha no puede estar vacía.",
        },
        isDate: {
          msg: "Debe ser una fecha válida.",
        },
      },
    },

    observaciones: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    descripcion: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "La descripción no puede estar vacía.",
        },
        len: {
          args: [5, 150],
          msg: "La descripción debe tener entre 5 y 150 caracteres",
        },
      },
    },

    caracteristicas: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },

    qr_cassete: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        msg: "El QR ya está registrado.",
      },
      /*validate: {
        notEmpty: {
          msg: "El QR no puede estar vacío.",
        },
      },*/
    },

    organo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El órgano no puede estar vacío.",
        },
        len: {
          args: [2, 100],
          msg: "El órgano debe tener entre 2 y 100 caracteres",
        },
      },
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "cassetes",
    timestamps: false,
  }
);

module.exports = Cassete;