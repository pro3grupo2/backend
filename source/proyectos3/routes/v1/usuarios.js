const express = require("express")

const users_controller = require("../../controllers/usuarios")

const auth_middleware = require("../../middleware/auth")

const global_validators = require("../../validators")

const router = express.Router()

router.get("/", auth_middleware.verificar_JWT, global_validators.pagination, users_controller.get_users)
router.get("/id/:id", auth_middleware.verificar_JWT, global_validators.params_id, users_controller.get_user_by_id)
router.get("/correo/:param", auth_middleware.verificar_JWT, global_validators.params_string, users_controller.get_user_by_correo)

module.exports = router
