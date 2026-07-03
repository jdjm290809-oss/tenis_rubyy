const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/contactos", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Conectado a MongoDB");
})
.catch((err) => {
    console.log("❌ Error al conectar:", err);
});

// Esquema
const contactosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});

// Modelo
const contactos = mongoose.model("contactos", contactosSchema);

// Ruta para guardar
app.post("/guardar", async (req, res) => {

    try {

        const nuevocontactos = new contactos({
            nombre: req.body.nombre,
            correo: req.body.correo,
            mensaje: req.body.mensaje
        });

        await nuevocontactos.save();

        res.status(200).json({
            mensaje: "Datos guardados correctamente"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al guardar los datos"
        });

    }

});

// Servidor
app.listen(3000, () => {
    console.log("🚀 Servidor iniciado en http://localhost:3000");
});