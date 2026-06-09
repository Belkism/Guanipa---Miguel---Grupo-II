const { productos } = require("../models");


function validarProducto(datos) {
    const errores = [];

    const nombre = datos.nombre?.trim() || "";
    const descripcion = datos.descripcion?.trim() || "";
    const precio = Number(datos.precio);
    const stock = Number(datos.stock);
    const imagen = datos.imagen?.trim() || "";  

    if (!nombre || nombre.length < 3) {
            errores.push("Nombre inválido");
        }

    if (/^\d+$/.test(nombre)) {
        errores.push("El nombre no puede contener solo números");
    }
    if (nombre.length > 100) {
        errores.push("El nombre no puede superar los 100 caracteres");
    }

    if (!descripcion || descripcion.length < 10) {
        errores.push("Descripción inválida");
    }
    if (descripcion.length > 500) {
        errores.push("La descripción no puede superar los 500 caracteres");
    }

    if (Number.isNaN(precio) || precio <= 0) {
        errores.push("Precio inválido");
    }

    if (!Number.isInteger(stock) || stock < 0) {
        errores.push("Stock inválido");
    }

    if (!imagen) {
        errores.push("Debe ingresar una imagen");
    }

    return errores;
}


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

            const errores = validarProducto(req.body);

            if (errores.length > 0) {
                return res.status(400).render("form", {
                    producto: {
                        id,
                        ...req.body
                    },
                    errores
                });
            }

            const producto = await productos.findByPk(id);

            if (!producto) {
                return res.status(404).send("Producto no encontrado");
            }

            const { nombre, descripcion, precio, stock, imagen } = req.body;

            await producto.update({
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                precio: Number(precio),
                stock: Number(stock),
                imagen: imagen?.trim()
            });

            return res.redirect("/admin/dashboard");

        } catch (error) {
            console.error(error);
            return res.status(500).send("Error interno");
        }
    }

};


module.exports = productoController;