// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/departamentos")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_departamentos
)
router.get("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_departamento
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.create_departamento
)
router.put("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.update_departamento
)
router.delete("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.delete_departamento
)

module.exports = router