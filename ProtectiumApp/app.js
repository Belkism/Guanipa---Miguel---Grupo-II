// Configuración inicial
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

// Base de datos
const sequelize = require("./database/db.js");
const { syncDB } = require("./models/index.js");


// Rutas importadas
const productosRoutes = require("./routes/productos.routes.js");
const ticketRoutes = require("./routes/ticket.router.js");
const authRoutes = require("./routes/auth.routes.js")

// App y configuración
const app = express();
const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Variables globales
let server = null
let shuttingDown = false

// Middlewares
app.use(cors());
app.use(express.json());
// servir archivos estáticos desde ruta absoluta dinamica
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));



// Rutas
app.use("/productos", productosRoutes);
app.use("/ticket", ticketRoutes);
app.use("/auth", authRoutes);



// Inicio del servidor
const startServer = async () => {
    try {
        
        await syncDB();
        
        server = app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })

    } catch (error) {
        console.log("Error al iniciar el servidor:", error)
        process.exit(1)
    }
}

// Apagado controlado
const shutdown = async (signal) => {
    if (shuttingDown) return
    shuttingDown = true

    console.log(`\nRecibido ${signal}. Cerrando aplicación...`)

    try {
        if (server && server.listening) {
            await new Promise((resolve, reject) => {
                server.close((error) => {
                    if (error && error.code !== "ERR_SERVER_NOT_RUNNING") {
                        return reject(error)
                    }
                    resolve()
                })
            })
            server = null
        }

        await sequelize.close() //Cierra todo y debe hacer una nueva llamada para crear una nueva instancia
        console.log("Aplicación detenida correctamente")
        process.exit(0)
    } catch (error) {
        console.log("Error durante el cierre:", error)
        process.exit(1)
    }
}

// Eventos del proceso
process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))

//Inicio
startServer();