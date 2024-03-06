// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const materias_controller = require("../../controllers/materias")
const materias_validators = require("../../validators/materias")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    global_validators.pagination,
    materias_controller.get_materias
)
router.get("/:materia_id",
    auth_middleware.get_and_verify_bearer_token,
    materias_validators.get_materia,
    materias_controller.get_materia
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    materias_validators.create_materia,
    materias_controller.create_materia
)
router.put("/:materia_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    materias_validators.update_materia,
    materias_controller.update_materia
)
router.delete("/:materia_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    materias_validators.delete_materia,
    materias_controller.delete_materia
)

module.exports = router