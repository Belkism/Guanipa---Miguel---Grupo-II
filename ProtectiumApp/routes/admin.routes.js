const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controllers.js");
const productoController = require("../controllers/productos.controllers.js")

router.get("/dashboard", adminController.mostrarDashboard);


router.get("/productos/crear", productoController.formCrear);
router.get("/productos/editar/:id", productoController.formEditar);

router.post("/productos/editar/:id", productoController.editar);



module.exports = router;