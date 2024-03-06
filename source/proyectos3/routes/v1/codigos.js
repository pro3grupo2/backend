// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const codigos_controller = require("../../controllers/codigos")
const codigos_validators = require("../../validators/codigos")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    codigos_controller.get_codigos
)
router.post("/",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    codigos_validators.create_codigo,
    codigos_controller.create_codigo
)

module.exports = router