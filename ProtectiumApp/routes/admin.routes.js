const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controllers.js");
const productoController = require("../controllers/productos.controllers.js");

const validarProducto = require("../middlewares/validarProducto.js");

router.get("/dashboard", adminController.mostrarDashboard);

router.get("/productos/crear", productoController.formCrear);

router.get("/productos/editar/:id", productoController.formEditar);

router.post("/productos/editar/:id",validarProducto, productoController.editar);

router.post("/productos/crear", validarProducto, productoController.crear);



module.exports = router;