const db = require("../database/db.js")
const { DataTypes } = require("sequelize")


const ventas = db.define("ventas", {

    nombre_cliente: {type: DataTypes.STRING},

    total: {type: DataTypes.DECIMAL(10,2)},

    fecha: {type: DataTypes.DATE}

})

module.exports = ventas