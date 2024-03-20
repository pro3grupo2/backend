const express = require("express")

const asignaturas_controller = require("../../controllers/asignaturas")
const asignaturas_validators = require("../../validators/asignaturas")

const auth_middleware = require("../../middleware/auth")
const global_validators = require("../../validators")

const router = express.Router()

router.get("/", auth_middleware.verificar_JWT, global_validators.pagination, asignaturas_controller.get_asignaturas)
router.get("/:id", auth_middleware.verificar_JWT, global_validators.params_id, asignaturas_controller.get_asignatura)

router.post("/", auth_middleware.verificar_JWT, auth_middleware.is_administrador, asignaturas_validators.asignatura, asignaturas_controller.create_asignatura)

router.put("/:id", auth_middleware.verificar_JWT, auth_middleware.is_administrador, global_validators.params_id, asignaturas_validators.asignatura, asignaturas_controller.update_asignatura)

module.exports = router
