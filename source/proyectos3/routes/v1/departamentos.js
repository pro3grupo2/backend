// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const departamentos_controller = require("../../controllers/departamentos")
const departamentos_validators = require("../../validators/departamentos")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    global_validators.pagination,
    departamentos_controller.get_departamentos
)
router.get("/:departamento_id",
    auth_middleware.get_and_verify_bearer_token,
    departamentos_validators.get_departamento,
    departamentos_controller.get_departamento
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    departamentos_validators.create_departamento,
    departamentos_controller.create_departamento
)
router.put("/:departamento_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    departamentos_validators.update_departamento,
    departamentos_controller.update_departamento
)
router.delete("/:departamento_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    departamentos_validators.delete_departamento,
    departamentos_controller.delete_departamento
)

module.exports = router