const db = require("../database/db.js")

const { DataTypes } = require("sequelize")


const productos = db.define("productos",{

    id:{
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    nombre: {type: DataTypes.STRING(100), allowNull: false},

    descripcion: {type: DataTypes.TEXT, allowNull: false},

    imagen: {type: DataTypes.STRING, allowNull: false},

    precio: {type: DataTypes.FLOAT, allowNull: false},

    stock: {type: DataTypes.INTEGER, allowNull: false},

    activo: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},

    categoria_id: {type: DataTypes.BIGINT.UNSIGNED, allowNull: false}

})

module.exports = productos