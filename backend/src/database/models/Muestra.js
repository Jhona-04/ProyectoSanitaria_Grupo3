const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Muestra extends Model { }

Muestra.init(
    {
        idMuestra: {
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
            validate: {
                len: {
                    args: [2, 100],
                    msg: "La observación debe tener entre 2 y 100 caracteres",
                },
            },
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

        tinicion: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Se debe seleccionar un tipo de tinicion"
                },
                len: {
                    args: [2, 100],
                    msg: "La tinición debe tener entre 2 y 100 caracteres"
                }
            }
        },

        qr_muestra: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "El QR ya está registrado.",
            },
            validate: {
                notEmpty: {
                    msg: "El QR no puede estar vacío.",
                },
            },
        },
        casseteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "muestras",
        timestamps: false,
    }
);

module.exports = Muestra;