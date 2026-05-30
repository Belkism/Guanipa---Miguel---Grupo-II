const express = require("express");
const router = express.Router();

const {obtenerProductos} = require("../controllers/productos.controllers.js");

router.get("/", obtenerProductos);

module.exports = router;