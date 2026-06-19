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

        try {

            const producto = await productos.findByPk(req.params.id);

            if (!producto) {
                return res.status(404).send("Producto no encontrado");
            }

            return res.render("form", {
                producto,
                errores: []
            });

        } catch (error) {

            console.error(error);

            return res.status(500).send("Error interno");
        }
    },

    formCrear : (req, res) => {
        res.render("form", {
            producto: null,
            errores: []
        });
    },

    editar: async (req, res) => {

        try {

            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).send("ID inválido");
            }

            const producto = await productos.findByPk(id);

            if (!producto) {
                return res.status(404).send("Producto no encontrado");
            }

            const datos = req.productoNormalizado; 

            await producto.update({
                nombre: datos.nombre,
                descripcion: datos.descripcion,
                precio: datos.precio,
                stock: datos.stock,
                imagen: datos.imagen
            });

            return res.redirect("/admin/dashboard");

        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno");
        }
    },

    crear : async (req, res) => {
        try {
                    
            const productoNuevo = await productos.create(
                req.productoNormalizado
            );

            return res.redirect("/admin/dashboard");

        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno");
        }
    },

    eliminar: async (req, res) => {

        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensaje: "ID inválido"
                });
            }

            const producto = await productos.findByPk(id);

            if (!producto) {
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }

            if (!producto.activo) {
                return res.status(200).json({
                    mensaje: "El producto ya estaba inactivo"
                });
            }

            await producto.update({ activo: false });

            return res.status(200).json({
                mensaje: "Producto dado de baja"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: "Error interno"
            });
        }
    },

    reactivar: async (req, res) => {

        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensaje: "ID inválido"
                });
            }

            const producto = await productos.findByPk(id);

            if (!producto) {
                return res.status(404).json({
                    mensaje: "Producto no encontrado"
                });
            }

            if (producto.activo) {
                return res.status(200).json({
                    mensaje: "El producto ya está activo"
                });
            }

            await producto.update({ activo: true });

            return res.status(200).json({
                mensaje: "Producto reactivado"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                mensaje: "Error interno"
            });
        }
    }

};


module.exports = productoController;