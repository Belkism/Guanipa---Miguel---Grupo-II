require("dotenv").config();
const express = require("express");
const app = express();

const path = require("path");
const sequelize = require("./database/db.js");
const PORT = process.env.PORT || 3000;

const { syncDB } = require("./models/index.js")
let server = null
let shuttingDown = false

// servir archivos estáticos desde ruta absoluta dinamica
app.use(express.static(path.join(__dirname, "public")));






const startServer = async () => {
    try {
        // Esto sincroniza la base de datos, solo se usa en desarrollo     
        await syncDB();
    
        server = app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })

    } catch (error) {
        console.log("Error al iniciar el servidor:", error)
        process.exit(1)
    }
}

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

process.on("SIGINT", () => shutdown("SIGINT"))
process.on("SIGTERM", () => shutdown("SIGTERM"))

startServer();