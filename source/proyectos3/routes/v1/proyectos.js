// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const proyectos_controller = require("../../controllers/proyectos")
const proyectos_middleware = require("../../middleware/proyectos")
const proyectos_validators = require("../../validators/proyectos")
const global_validators = require("../../validators/validation")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.verificar_JWT,
    global_validators.pagination,
    proyectos_controller.get_proyectos
)
router.get("/:id",
    auth_middleware.verificar_JWT,
    proyectos_validators.get_id,
    proyectos_controller.get_proyecto
)
router.post("/",
    auth_middleware.verificar_JWT,
    proyectos_middleware.upload_file.fields([
        //{name: "ruta_fichero", maxCount: 1},
        {name: "portada", maxCount: 1}
    ]),
    proyectos_middleware.inject_file_path_to_body,
    proyectos_validators.create_proyecto,
    proyectos_controller.create_proyecto
)
router.put("/:id",
    auth_middleware.verificar_JWT,
    proyectos_validators.update_proyecto,
    proyectos_middleware.is_propietario_or_administrador,
    proyectos_controller.update_proyecto
)
router.delete("/:id",
    auth_middleware.verificar_JWT,
    proyectos_validators.get_id,
    proyectos_middleware.is_propietario_or_administrador,
    proyectos_controller.delete_proyecto
)

module.exports = router