const express = require("express");
const router = express.Router();


const adminController = require("../controllers/admin.controllers.js");
const productoController = require("../controllers/productos.controllers.js");


const validarProducto = require("../middlewares/validarProducto.js");
const subirImagenProducto = require("../middlewares/subirImagenProducto.js");
const verificarJwt = require("../middlewares/verificarJWT.js");

router.use(verificarJwt);

router.get("/dashboard", adminController.mostrarDashboard);

router.get("/productos/crear",productoController.formCrear);

router.get("/productos/editar/:id", productoController.formEditar);

router.post("/productos/editar/:id", subirImagenProducto, validarProducto, productoController.editar);

router.post("/productos/crear", subirImagenProducto, validarProducto, productoController.crear);



module.exports = router;