// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/alumnos")
const alumnos_validators = require("../../validators/alumnos")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    global_validators.pagination,
    premios_controller.get_alumnos
)
router.get("/:alumno_id",
    auth_middleware.get_and_verify_bearer_token,
    premios_validators.get_alumno,
    premios_controller.get_alumno
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_validators.create_alumno,
    premios_controller.create_alumno
)
router.put("/:alumno_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_validators.update_alumno,
    premios_controller.update_alumno
)
router.delete("/:alumno_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    premios_validators.delete_alumno,
    premios_controller.delete_alumno
)

module.exports = router