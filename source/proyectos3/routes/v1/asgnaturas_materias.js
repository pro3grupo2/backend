// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/asignaturas_materias")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_asignaturas_materias
)
router.get("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_asignaturas_materia
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.create_asignaturas_materia
)
router.put("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.update_asignaturas_materia
)
router.delete("/:premio_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.delete_asignaturas_materia
)

module.exports = router