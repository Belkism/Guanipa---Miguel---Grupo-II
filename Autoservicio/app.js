const express = require("express");
const app = express();
const path = require("path");


// servir archivos estáticos desde ruta absoluta dinamica
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});