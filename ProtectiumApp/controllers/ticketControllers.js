const db = require("../models/index.js");
const path = require("path");
const puppeteer = require("puppeteer");


const resolverVentaId = async (idsQuery) => {
    if (idsQuery) {
        const ids = String(idsQuery)
            .split(",")
            .map((id) => Number(id))
            .filter((id) => Number.isInteger(id) && id > 0);

        if (ids.length > 0) {
            return ids[0];
        }
    }

    const ultimaVenta = await db.ventas.findOne({
        order: [["fecha", "DESC"], ["id", "DESC"]],
    });

    return ultimaVenta ? ultimaVenta.id : null;
};

const construirTicket = async (ventaId) => {
    const venta = await db.ventas.findByPk(ventaId);

    if (!venta) {
        return null;
    }

    const detalles = await db.detalleVentas.findAll({
        where: { venta_id: ventaId },
        include: [{
            model: db.productos,
            attributes: ["id", "nombre", "precio"],
        }],
    });

    const productos = detalles.map((detalle) => {
        const producto = detalle.producto || detalle.productos;
        return {
            id: producto ? producto.id : detalle.producto_id,
            nombre: producto ? producto.nombre : "Producto",
            precio: producto ? producto.precio : 0,
            cantidad: detalle.cantidad,
        };
    });

    const totalVenta = Number(venta.total);
    const totalCalculado = productos.reduce((acum, item) => {
        const precio = Number(item.precio) || 0;
        const cantidad = Number(item.cantidad) || 0;
        return acum + (precio * cantidad);
    }, 0);

    return {
        idticket: venta.id,
        fechaCompra: venta.fecha,
        cliente: venta.nombre_cliente,
        totalCompra: totalVenta > 0 ? totalVenta : totalCalculado,
        productos,
        medioPago: venta.medio,
        esVista: true,
    };
};

const ticketController = {
    checkoutTicket: async (req, res) => {
        const transaction = await db.ventas.sequelize.transaction();

        try {
            const carrito = Array.isArray(req.body.carrito) ? req.body.carrito : [];
            const nombreCliente = (req.body.nombre_cliente || "").trim() || "Cliente Mostrador";
            const medioPago = req.body.medio || "No especificado";

            if (carrito.length === 0) {
                await transaction.rollback();
                return res.status(400).json({ error: "El carrito está vacío" });
            }

            const total = carrito.reduce((acc, item) => {
                const precio = Number(item.precio) || 0;
                const cantidad = Number(item.cantidad) || 1;
                return acc + (precio * cantidad);
            }, 0);

            const venta = await db.ventas.create({
                nombre_cliente: nombreCliente,
                total,
                fecha: new Date(),
                usuario_id: null,
                medio: medioPago,
            }, { transaction });

            const detallePayload = carrito.map((item) => ({
                venta_id: venta.id,
                producto_id: Number(item.id),
                cantidad: Number(item.cantidad) || 1,
            }));

            await db.detalleVentas.bulkCreate(detallePayload, { transaction });
            await transaction.commit();

            return res.status(201).json({
                mensaje: "Compra registrada",
                idticket: venta.id,
            });
        } catch (error) {
            await transaction.rollback();
            console.error("Error al registrar checkout:", error);
            return res.status(500).json({ error: "No se pudo registrar la compra" });
        }
    },

    getticket: async (req, res) => {
        try {
            const ventaId = await resolverVentaId(req.query.ids);

            if (!ventaId) {
                return res.status(404).send("No hay ventas para mostrar ticket");
            }

            const ticket = await construirTicket(ventaId);

            if (!ticket) {
                return res.status(404).send("Venta no encontrada");
            }

            res.sendFile(path.join(__dirname, "../public/ticket.html"));
        } catch (error) {
            console.log(error);
            res.status(500).send("Error interno del servidor");
        }
    },

    getticketData: async (req, res) => {
        try {
            const ventaId = await resolverVentaId(req.query.ids);

            if (!ventaId) {
                return res.status(404).json({ error: "No hay ventas para mostrar ticket" });
            }

            const ticket = await construirTicket(ventaId);

            if (!ticket) {
                return res.status(404).json({ error: "Venta no encontrada" });
            }

            return res.json(ticket);
        } catch (error) {
            console.error("Error al obtener ticket:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    descargarticket: async (req, res) => {
        let browser;

        try {
            const ventaId = await resolverVentaId(req.query.ids);

            if (!ventaId) {
                return res.status(404).send("No hay ventas para mostrar ticket");
            }

            const protocolo = req.get("x-forwarded-proto") || req.protocol;
            const host = req.get("host");
            const ticketUrl = `${protocolo}://${host}/ticket?ids=${ventaId}`;

            browser = await puppeteer.launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });

            const page = await browser.newPage();
            await page.goto(ticketUrl, { waitUntil: "networkidle0", timeout: 45000 });

            // Evita que el enlace de descarga se renderice dentro del PDF.
            await page.addStyleTag({ content: ".actions { display: none !important; }" });

            const pdfBuffer = await page.pdf({
                format: "A4",
                printBackground: true,
                margin: {
                    top: "20px",
                    right: "20px",
                    bottom: "20px",
                    left: "20px",
                },
            });

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=ticket-${ventaId}.pdf`);
            return res.send(pdfBuffer);
        } catch (error) {
            console.error("Error al descargar el ticket:", error);
            return res.status(500).send("Error interno del servidor");
        } finally {
            if (browser) {
                await browser.close();
            }
        }
    },
};

module.exports = ticketController;
