// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/alumnos")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_alumnos
)
router.get("/:alumno_id",
    auth_middleware.get_and_verify_bearer_token,
    premios_controller.get_alumno
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.create_alumno
)
router.put("/:alumno_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.update_alumno
)
router.delete("/:alumno_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_controller.delete_alumno
)

module.exports = router