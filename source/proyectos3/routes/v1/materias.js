// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const materias_controller = require("../../controllers/materias")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    materias_controller.get_materias
)
router.get("/:materia_id",
    auth_middleware.get_and_verify_bearer_token,
    materias_controller.get_materia
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    materias_controller.create_materia
)
router.put("/:materia_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    materias_controller.update_materia
)
router.delete("/:materia_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    materias_controller.delete_materia
)

module.exports = router