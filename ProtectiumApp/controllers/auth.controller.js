const usuarios = require("../models/usuarios");

const authController = {
    mostrarLogin : (req, res) => {
        res.render("login");
    },
    
    login : async (req, res) => {       
        const { correo, contrasena } = req.body;
        
        const usuario = await usuarios.findOne({
            where: {
                correo,
                contrasena
            }
        });

        if (!usuario) {
            return res.render("login", {
                error: "Usuario o contraseña incorrectos"
            });
        }

        res.redirect("/admin/dashboard");
    }
};


module.exports = authController;