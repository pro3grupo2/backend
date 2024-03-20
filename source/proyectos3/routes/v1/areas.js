// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const areas_controller = require("../../controllers/areas")
const areas_validators = require("../../validators/areas")
const global_validators = require("../../validators")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    areas_controller.get_areas
)
router.get("/:id",
    auth_middleware.verificar_JWT,
    areas_validators.get_id,
    areas_controller.get_area
)
router.post("/",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    areas_validators.create_area,
    areas_controller.create_area
)
router.put("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    areas_validators.update_area,
    areas_controller.update_area
)
router.delete("/:id",
    auth_middleware.verificar_JWT,
    auth_middleware.is_administrador,
    areas_validators.get_id,
    areas_controller.delete_area
)

module.exports = router