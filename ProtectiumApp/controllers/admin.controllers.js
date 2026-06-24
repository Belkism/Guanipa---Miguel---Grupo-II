const productos = require("../models/productos");

const adminController = {
    mostrarDashboard: async (req, res) => {
        try {
            const listaProductos = await productos.findAll({
                raw: true
            });

            res.render("dashboard", {
                productos: listaProductos
            });

        } catch (error) {
            console.error(error);

            res.status(500).send("Error al cargar el dashboard");
        }
    }
};

module.exports = adminController;

