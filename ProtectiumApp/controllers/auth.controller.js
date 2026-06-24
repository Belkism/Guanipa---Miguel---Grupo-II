const usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

            const coincide = await bcrypt.compare(
                contrasena,
                usuario.contrasena
            );

            if (!coincide) {
                return res.render("login", {
                    error: "Usuario o contraseña incorrectos"
                });
            }

            const token = crearToken(usuario);

            res.cookie(
                "token",
                token,
                {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict",
                    maxAge : 60 * 60 * 1000
                }
            );


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
            
            // Verificar si ya existe
            const usuarioExistente = await usuarios.findOne({
                where: {
                    correo: req.usuarioNormalizado.correo
                }
            });

            if (usuarioExistente) {
                return res.status(409).json({
                    mensaje: "El correo ya está registrado"
                });
            }

            const saltRound = 10;

            const hash = await bcrypt.hash(
                req.usuarioNormalizado.contrasena, 
                saltRound
            );

            const usuario = await usuarios.create({
                ...req.usuarioNormalizado,
                contrasena: hash,
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
    },

    logout : (req, res) => {
        
        res.clearCookie(
            "token",
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            }
            
        );

        res.redirect("/");
    }
};


const crearToken = (datos) => {
    const token = jwt.sign(
        {
            id: datos.id,
            rol: datos.rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
            algorithm: 'HS256'
        }
    );

    return token;
}


module.exports = authController;