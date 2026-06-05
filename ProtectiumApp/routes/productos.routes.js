const express = require("express");
const router = express.Router();

const productoController = require("../controllers/productos.controllers.js");

router.get("/", productoController.obtenerProductos);

module.exports = router;