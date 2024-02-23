// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/premios")
const premios_validators = require("../../validators/premios")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    global_validators.pagination,
    premios_controller.get_premios
)
router.get("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    premios_validators.get_premio,
    premios_controller.get_premio
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    auth_middleware.is_administrador,
    premios_validators.create_premio,
    premios_controller.create_premio
)
router.put("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    auth_middleware.is_administrador,
    premios_validators.update_premio,
    premios_controller.update_premio
)
router.delete("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    auth_middleware.is_administrador,
    premios_validators.delete_premio,
    premios_controller.delete_premio
)

module.exports = router