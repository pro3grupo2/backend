// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const departamentos_controller = require("../../controllers/departamentos")
const departamentos_validators = require("../../validators/departamentos")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    departamentos_controller.get_departamentos
)
router.get("/:id",
    auth_middleware.verificar_JWT,
    departamentos_validators.get_id,
    departamentos_controller.get_departamento
)
router.post("/",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    departamentos_validators.create_departamento,
    departamentos_controller.create_departamento
)
router.put("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    departamentos_validators.update_departamento,
    departamentos_controller.update_departamento
)
router.delete("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    departamentos_validators.get_id,
    departamentos_controller.delete_departamento
)

module.exports = router