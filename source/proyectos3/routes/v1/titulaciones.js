const express = require("express")

const titulacions_controller = require("../../controllers/titulaciones")
const titulaciones_validators = require("../../validators/titulaciones")

const auth_middleware = require("../../middleware/auth")
const global_validators = require("../../validators")

const router = express.Router()

router.get("/", auth_middleware.verificar_JWT, titulacions_controller.get_titulaciones)
router.get("/:id", auth_middleware.verificar_JWT, global_validators.params_id, titulacions_controller.get_titulacion)

router.post("/", auth_middleware.verificar_JWT, auth_middleware.is_administrador, titulaciones_validators.titulacion, titulacions_controller.create_titulacion)

router.put("/:id", auth_middleware.verificar_JWT, auth_middleware.is_administrador, global_validators.params_id, titulaciones_validators.titulacion, titulacions_controller.update_titulacion)

module.exports = router
