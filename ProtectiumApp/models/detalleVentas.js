/* importar la base de datos */
const db = require("../database/db.js")
const { DataTypes } = require("sequelize")


const detalleVentas = db.define("detalle_Ventas", {

    venta_id: {type: DataTypes.INTEGER},

    producto_id: {type: DataTypes.INTEGER},

    cantidad: {type: DataTypes.INTEGER},

    precio_unitario: {type: DataTypes.DECIMAL(10,2)}

})

module.exports = detalleVentas