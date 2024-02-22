// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/materias")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_materias
)
router.get("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_materia
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.create_materia
)
router.put("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.update_materia
)
router.delete("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.delete_materia
)

module.exports = router