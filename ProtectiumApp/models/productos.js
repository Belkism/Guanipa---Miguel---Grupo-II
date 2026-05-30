const db = require("../database/db.js")

const { DataTypes } = require("sequelize")


const productos = db.define("productos",
    {

        id:{
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

    nombre: {type: DataTypes.STRING, allowNull: false,},

    descripcion: {type: DataTypes.TEXT,allowNull: true,},

    imagen: {type: DataTypes.STRING,allowNull: false,},

    precio: {type: DataTypes.FLOAT,allowNull: false,},

    stock: {type: DataTypes.INTEGER, allowNull: true,},

    activo: {type: DataTypes.BOOLEAN,allowNull: false,},

    categoria_id: {type: DataTypes.INTEGER,allowNull: false,}

})

module.exports = productos