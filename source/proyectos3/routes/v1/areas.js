const express = require("express")

const areas_controller = require("../../controllers/areas")
const areas_validators = require("../../validators/areas")

const auth_middleware = require("../../middleware/auth")
const global_validators = require("../../validators")

const router = express.Router()

router.get("/", auth_middleware.verificar_JWT, areas_controller.get_areas)
router.get("/:id", auth_middleware.verificar_JWT, global_validators.params_id, areas_controller.get_area)

router.post("/", auth_middleware.verificar_JWT, auth_middleware.is_administrador, areas_validators.area, areas_controller.create_area)

router.put("/:id", auth_middleware.verificar_JWT, auth_middleware.is_administrador, global_validators.params_id, areas_validators.area, areas_controller.update_area)

module.exports = router
