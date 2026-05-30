/* importar la base de datos */
const db = require("../database/db.js")
const { DataTypes } = require("sequelize")


const detalleVentas = db.define("detalle_Ventas", {

    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    venta_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
    },

    producto_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: false,
    },

    cantidad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,    
    },

    }

)

module.exports = detalleVentas