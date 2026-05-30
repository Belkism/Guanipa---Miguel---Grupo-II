const db = require("../database/db.js")
const { DataTypes } = require("sequelize")


const ventas = db.define("ventas", {
    id:{
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre_cliente: {type: DataTypes.STRING,allowNull: false},

    total: {type: DataTypes.DECIMAL(10,2),allowNull: false},

    fecha: {type: DataTypes.DATE,allowNull: false},

    usuario_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },

    medio:{
        type: DataTypes.STRING(50),
        allowNull: false,
    }

})

module.exports = ventas