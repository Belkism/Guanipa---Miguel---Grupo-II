const db = require("../database/db.js")

const { DataTypes } = require("sequelize")


const usuarios = db.define("usuarios", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    nombre: {type: DataTypes.STRING(200),allowNull: false,},

    correo: {type: DataTypes.STRING(200),allowNull: false, unique: true},

    contrasena: {type: DataTypes.STRING(200),allowNull: false,},

    telefono: {type: DataTypes.STRING(200),allowNull: true,},

    rol: {type: DataTypes.STRING,allowNull: false,},

    activo: {type: DataTypes.BOOLEAN,allowNull: false,}

}, {
    timestamps: true
})



module.exports = usuarios