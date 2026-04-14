const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Usuario extends Model { }

Usuario.init(
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El nombre no puede estar vacío.",
                },
                len: {
                    args: [2, 50],
                    msg: "El nombre debe tener entre 2 y 50 caracteres.",
                },
            },
        },

        apellidos: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Los apellidos no pueden estar vacíos.",
                },
                len: {
                    args: [2, 100],
                    msg: "Los apellidos deben tener entre 2 y 100 caracteres.",
                },
            },
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                msg: "El email ya está registrado.",
            },
            validate: {
                notEmpty: {
                    msg: "El email no puede estar vacío.",
                },
                isEmail: {
                    msg: "El email no tiene un formato válido.",
                },
                len: {
                    args: [5, 100],
                    msg: "El email debe tener entre 5 y 100 caracteres.",
                },
            },
        },

        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La contraseña no puede estar vacía.",
                },
                len: {
                    args: [6, 100],
                    msg: "La contraseña debe tener al menos 6 caracteres.",
                },
            },
        },

        rol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El campo rol no puede estar vacio"
                }
            }
        },

        centro: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El centro no puede estar vacío.",
                },
                len: {
                    args: [2, 100],
                    msg: "El centro debe tener entre 2 y 100 caracteres.",
                },
            },
        },

        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        resetTokenExpires: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "usuarios",
        timestamps: false,
    }
);

module.exports = Usuario;