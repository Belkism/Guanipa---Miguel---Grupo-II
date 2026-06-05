const productos = require("../models/productos");

const adminController = {
    mostrarDashboard : async (req, res) => {
        const listaProductos = await productos.findAll({
        raw: true
        });

        console.log(listaProductos);
        

        res.render("dashboard", {
            productos: listaProductos
        });
    }      
};

module.exports = adminController;

