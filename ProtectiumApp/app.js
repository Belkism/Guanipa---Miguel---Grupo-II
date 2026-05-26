require("dotenv").config();
const express = require("express");
const app = express();

const path = require("path");
const sequelize = require("./database/db.js");
const PORT = process.env.DB_PORT;

const { syncDB } = require("./models/index.js")

// servir archivos estáticos desde ruta absoluta dinamica
app.use(express.static(path.join(__dirname, "public")));






const startServer = async () => {
    try {
        // Esto sincroniza la base de datos, solo se usa en desarrollo     
        await syncDB();
    
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })

    } catch (error) {
        console.log("Error al iniciar el servidor:", error)
    }
}

startServer();