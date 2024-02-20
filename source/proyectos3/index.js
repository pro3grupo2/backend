// Autor       : Adrian Toral, Ivan Guio
// Fecha       : 2024-02-17
// Descripcion : Punta de entrada de la aplicacion

// Importar modulos
const express = require("express")
const router_v1 = require("./routes/v1")

// Crear aplicacion express y definir puerto
const app = express()
const port = process.env.PORT || 3000

// Configurar rutas y middlewares
app.use(express.json())
app.use("/api/v1", router_v1)

// Iniciar servidor
app.listen(port, () => {
    console.log(`[*] API is listening on port ${port}`)
})