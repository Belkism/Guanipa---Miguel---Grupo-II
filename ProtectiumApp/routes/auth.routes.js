const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller.js");

router.get("/login", authController.mostrarLogin);

router.post("/login", authController.login);

module.exports = router;