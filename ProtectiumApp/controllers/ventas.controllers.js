const db = require("../models");

const ventasController ={ 
    listar : async (req, res) => {

        try {

            const ventas = await db.ventas.findAll({
                attributes: ["id", "nombre_cliente", "total", "medio", "fecha"],

                include: [
                    {
                        model: db.detalleVentas,
                        attributes: ["cantidad"],
                        include: [
                            {
                                model: db.productos,
                                attributes: ["nombre"]
                            }
                        ]
                    }
                ],

                order: [["fecha", "DESC"]]
            });

            const ventasFormateadas = ventas.map(venta => ({
                id: venta.id,
                nombre_cliente: venta.nombre_cliente,
                total: venta.total,
                medio: venta.medio,
                fecha: venta.fecha,

                productos: venta.detalle_Ventas
                    .map(detalle => `${detalle.producto.nombre} x${detalle.cantidad}`)
            }));

          
            res.render("lista_ventas", {
                ventasFormateadas
            });

        } catch(error){

            console.log(error);

            res.status(500).send(
                "Error al obtener ventas"
            );
        }
    }
};


module.exports = ventasController;