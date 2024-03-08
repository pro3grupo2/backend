// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const materias_controller = require("../../controllers/materias")
const materias_validators = require("../../validators/materias")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    materias_controller.get_materias
)
router.get("/:id",
    auth_middleware.verificar_JWT,
    materias_validators.get_id,
    materias_controller.get_materia
)
router.post("/",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    materias_validators.create_materia,
    materias_controller.create_materia
)
router.put("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    materias_validators.update_materia,
    materias_controller.update_materia
)
router.delete("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    materias_validators.get_id,
    materias_controller.delete_materia
)

module.exports = router