// Autor       : Adrian Toral, Ivan Guio
// Fecha       : 2024-02-17
// Descripcion : Punta de entrada de la aplicacion

// Importar modulos
const express = require("express")
const cors = require('cors')
const router_v1 = require("./routes/v1")
const path = require('path')

require('dotenv').config()
require('./databases')

// Crear aplicacion express y definir puerto
const app = express()
const port = process.env.PORT

// Configurar rutas y middlewares
app.use(express.json())
app.use(cors())
app.use("/api/v1", router_v1)
app.use("/docs", express.static(path.join(__dirname, 'docs')))

// Iniciar servidor
app.listen(port, () => {
    console.log(`[*] API is listening on port ${port}`)
})