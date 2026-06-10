const bcrypt = require("bcrypt");
const usuarios  = require("../models/usuarios.js");

const crearAdminPorDefecto = async () => {

    const admin = await usuarios.findOne({
        where: {
            correo: "patricio@test.com"
        }
    });

    if (!admin) {
        const saltRounds = 10
        const hash = await bcrypt.hash("password123", saltRounds);

        await usuarios.create({
            nombre: "Patricio Rey",
            correo: "patricio@test.com",
            contrasena: hash,
            telefono: "0303456",
            rol: "administrador",
            activo: true
        });

        console.log("Administrador creado");
    }
};

module.exports = crearAdminPorDefecto;