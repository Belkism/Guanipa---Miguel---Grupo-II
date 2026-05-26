const db = require("../database/db.js")

const usuarios = require("./usuarios.js")
const productos = require("./productos.js")
const categorias = require("./categorias.js")
const ventas = require("./ventas.js")
const detalleVentas = require("./detalleVentas.js")

/* ======================
   RELACIONES
====================== */

/* CATEGORIAS -> PRODUCTOS (1:N) */
categorias.hasMany(productos, {
    foreignKey: "categoria_id"
})

productos.belongsTo(categorias, {
    foreignKey: "categoria_id"
})


/* VENTAS -> DETALLE_VENTAS (1:N) */
ventas.hasMany(detalleVentas, {
    foreignKey: "venta_id"
})

detalleVentas.belongsTo(ventas, {
    foreignKey: "venta_id"
})


/* PRODUCTOS -> DETALLE_VENTAS (1:N) */
productos.hasMany(detalleVentas, {
    foreignKey: "producto_id"
})

detalleVentas.belongsTo(productos, {
    foreignKey: "producto_id"
})

/* =========================
   SINCRONIZACIÓN BD
========================= */

const syncDB = async () => {
    try {
        await db.authenticate()
        console.log("Conexión exitosa")

        await db.sync({
            alter: true
        })

        console.log("Base de datos sincronizada")
    } catch (error) {
        console.log("Error al sincronizar:", error)
    }
}

module.exports = {
    syncDB,
    usuarios,
    productos,
    categorias,
    ventas,
    detalleVentas
}