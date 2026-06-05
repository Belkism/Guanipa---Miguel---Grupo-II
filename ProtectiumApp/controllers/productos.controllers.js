const { productos } = require("../models");

const productoController = {
    obtenerProductos : async (req, res) => {

        try {

            const listaProductos = await productos.findAll({
                where: {
                    activo: true
                },
                raw: true
            });

            res.status(200).json(listaProductos);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                mensaje: "Error al obtener productos"
            });
        }
    },

    formEditar : async (req, res) => {
        const producto = await productos.findByPk(req.params.id);

        res.render("form", {
            producto
        });
    },

    formCrear : (req, res) => {
        res.render("form", {
            producto: null
        });
    }

};


module.exports = productoController;