// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/premios")
const premios_validators = require("../../validators/premios")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    premios_controller.get_premios
)
router.get("/:id",
    auth_middleware.verificar_JWT,
    premios_validators.get_id,
    premios_controller.get_premio
)
router.post("/",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    premios_validators.create_premio,
    premios_controller.create_premio
)
router.put("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    premios_validators.update_premio,
    premios_controller.update_premio
)
router.delete("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    premios_validators.get_id,
    premios_controller.delete_premio
)

module.exports = router