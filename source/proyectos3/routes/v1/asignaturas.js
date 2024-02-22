// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const asignaturas_controller = require("../../controllers/asignaturas")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    asignaturas_controller.get_asignaturas
)
router.get("/:asignatura_id",
    auth_middleware.get_and_verify_bearer_token,
    asignaturas_controller.get_asignatura
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    asignaturas_controller.create_asignatura
)
router.put("/:asignatura_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    asignaturas_controller.update_asignatura
)
router.delete("/:asignatura_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    asignaturas_controller.delete_asignatura
)

module.exports = router