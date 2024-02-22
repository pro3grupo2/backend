// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const titulacions_controller = require("../../controllers/titulaciones")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    titulacions_controller.get_titulaciones
)
router.get("/:titulacion_id",
    auth_middleware.get_and_verify_bearer_token,
    titulacions_controller.get_titulacion
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    titulacions_controller.create_titulacion
)
router.put("/:titulacion_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    titulacions_controller.update_titulacion
)
router.delete("/:titulacion_id",
    auth_middleware.get_and_verify_bearer_token,
    //auth_middleware.is_administrador,
    titulacions_controller.delete_titulacion
)

module.exports = router