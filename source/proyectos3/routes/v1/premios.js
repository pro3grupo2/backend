// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/premios")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_premios
)
router.get("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_premio
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    auth_middleware.is_administrador,
    premios_controller.create_premio
)
router.put("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    auth_middleware.is_administrador,
    premios_controller.update_premio
)
router.delete("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    auth_middleware.is_administrador,
    premios_controller.delete_premio
)

module.exports = router