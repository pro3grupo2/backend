// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const titulacions_controller = require("../../controllers/titulaciones")
const titulaciones_validators = require("../../validators/titulaciones")
const global_validators = require("../../validators")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    titulacions_controller.get_titulaciones
)
router.get("/:id",
    auth_middleware.verificar_JWT,
    titulaciones_validators.get_id,
    titulacions_controller.get_titulacion
)
router.post("/",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    titulaciones_validators.create_titulacion,
    titulacions_controller.create_titulacion
)
router.put("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    titulaciones_validators.update_titulacion,
    titulacions_controller.update_titulacion
)
router.delete("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    titulaciones_validators.get_id,
    titulacions_controller.delete_titulacion
)

module.exports = router