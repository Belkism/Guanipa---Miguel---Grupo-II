const usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");

const authController = {
    mostrarLogin : (req, res) => {
        res.render("login");
    },

    login : async (req, res) => {
        try{
            const {correo, contrasena} = req.body;

            const usuario = await usuarios.findOne({
                where: { correo }
            });

            if (!usuario) {
                return res.render("login", {
                    error: "Usuario o contraseña incorrectos"
                });
            }

            const coincide = await bcrypt.compare(contrasena, usuario.contrasena);

            if (!coincide) {
                return res.render("login", {
                    error: "Usuario o contraseña incorrectos"
                });
            }

            //Si usaramos sesiones, se guardaria aca el ususario

            return res.redirect("/admin/dashboard");

        } catch (error) {
            console.error(error);

            return res.render("login", {
                error: "Ocurrió un error al iniciar sesión"
            });
        }
    },
    
    registrar: async (req, res) => {
        try {
            const {nombre, correo, contrasena, telefono, rol} = req.body;

            if (!nombre || !correo || !contrasena || !telefono || !rol) {
                return res.status(400).json({
                    mensaje: "Faltan datos obligatorios"
                });
            }

            // Verificar si ya existe
            const usuarioExistente = await usuarios.findOne({
                where: { correo }
            });

            if (usuarioExistente) {
                return res.status(409).json({
                    mensaje: "El correo ya está registrado"
                });
            }

            const saltRound = 10;

            const hash = await bcrypt.hash(contrasena, saltRound);


            const usuario = await usuarios.create({
                nombre,
                correo,
                contrasena: hash,
                telefono,
                rol,
                activo: true
            });

            return res.status(201).json({
                mensaje: "Usuario registrado correctamente",
                id: usuario.id
            });
          

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensaje: "Ocurrió un error al procesar la solicitud"
            });
        }
    }
};


module.exports = authController;