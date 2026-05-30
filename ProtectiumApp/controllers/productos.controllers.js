const { productos } = require("../models");

const obtenerProductos = async (req, res) => {

    try {

        const listaProductos = await productos.findAll({raw:true});

        res.status(200).json(listaProductos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener productos"
        });

    }

};

module.exports = {
    obtenerProductos
};