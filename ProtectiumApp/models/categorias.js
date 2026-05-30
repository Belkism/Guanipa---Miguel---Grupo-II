const db = require("../database/db.js")
const { DataTypes } = require("sequelize")


const categorias = db.define("categorias", {
    id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },


    tipo:{
        type: DataTypes.STRING,
        allowNull: false,
    }
   

})

module.exports = categorias