const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/db");

class Imagen extends Model { }

Imagen.init(
    {
        idImagen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imagen: {
            type : DataTypes.BLOB('long'),
            allowNull: true
        },
        muestraId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "imagenes",
        timestamps: false,
    }
);

module.exports = Imagen;