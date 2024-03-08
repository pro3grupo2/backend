// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const asignaturas_controller = require("../../controllers/asignaturas")
const asignaturas_validators = require("../../validators/asignaturas")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    asignaturas_controller.get_asignaturas
)
router.get("/:id",
    auth_middleware.verificar_JWT,
    asignaturas_validators.get_id,
    asignaturas_controller.get_asignatura
)
router.post("/",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    asignaturas_validators.create_asignatura,
    asignaturas_controller.create_asignatura
)
router.put("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    asignaturas_validators.update_asignatura,
    asignaturas_controller.update_asignatura
)
router.delete("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    asignaturas_validators.get_id,
    asignaturas_controller.delete_asignatura
)

module.exports = router