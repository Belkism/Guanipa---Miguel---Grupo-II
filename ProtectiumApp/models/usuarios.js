const db = require("../database/db.js")

const { DataTypes } = require("sequelize")


const usuarios = db.define("usuarios", {

    correo: {type: DataTypes.STRING},

    contrasena: {type: DataTypes.STRING},

    rol: {type: DataTypes.STRING},

    activo: {type: DataTypes.BOOLEAN,}

})

module.exports = usuarios