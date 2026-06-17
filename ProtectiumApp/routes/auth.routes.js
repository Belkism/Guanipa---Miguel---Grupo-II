const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller.js");

const validarRegistro = require("../middlewares/validarRegistro.js");


router.get("/login", authController.mostrarLogin);

router.post("/login", authController.login);

router.post("/registrar", validarRegistro, authController.registrar);

router.get("/logout", authController.logout);

module.exports = router;