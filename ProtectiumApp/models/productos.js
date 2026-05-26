const db = require("../database/db.js")

const { DataTypes } = require("sequelize")


const productos = db.define("productos", {

    nombre: {type: DataTypes.STRING},

    descripcion: {type: DataTypes.STRING(1000)},

    imagen: {type: DataTypes.STRING},

    precio: {type: DataTypes.DECIMAL(10,2)},

    stock: {type: DataTypes.INTEGER},

    activo: {type: DataTypes.BOOLEAN},

    categoria_id: {type: DataTypes.INTEGER}

})

module.exports = productos