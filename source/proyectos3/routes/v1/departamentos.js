// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const departamentos_controller = require("../../controllers/departamentos")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    departamentos_controller.get_departamentos
)
router.get("/:departamento_id",
    auth_middleware.get_and_verify_bearer_token,
    departamentos_controller.get_departamento
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    departamentos_controller.create_departamento
)
router.put("/:departamento_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    departamentos_controller.update_departamento
)
router.delete("/:departamento_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    departamentos_controller.delete_departamento
)

module.exports = router