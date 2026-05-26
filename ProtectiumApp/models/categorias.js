const db = require("../database/db.js")
const { DataTypes } = require("sequelize")


const categorias = db.define("categorias", {

    nombre: {type: DataTypes.STRING}

})

module.exports = categorias