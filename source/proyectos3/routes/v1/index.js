// Registra todas las rutas de los archivos en el directorio actual y las exporta
const express = require("express")
const fs = require("fs")

const router = express.Router()

// Se obtienen todas las rutas de los archivos en el directorio actual y se agregan al router
fs.readdirSync(__dirname).filter((file) => {
    const name = file.split('.').shift()
    if (name !== 'index') router.use("/" + name, require("./" + name))
})

module.exports = router