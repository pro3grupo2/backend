// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const proyectos_controller = require("../../controllers/proyectos")
const proyectos_middleware = require("../../middleware/proyectos")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/",
    auth_middleware.get_and_verify_bearer_token,
    proyectos_controller.get_proyectos
)
router.get("/:proyecto_id",
    auth_middleware.get_and_verify_bearer_token,
    proyectos_controller.get_proyecto
)
router.post("/",
    auth_middleware.get_and_verify_bearer_token,
    proyectos_middleware.upload_file.fields([
        {name: "ruta_fichero", maxCount: 1},
        {name: "ruta_imagen", maxCount: 1}
    ]),
    proyectos_middleware.inject_file_path_to_body,
    proyectos_controller.create_proyecto
)
router.put("/:proyecto_id",
    auth_middleware.get_and_verify_bearer_token,
    proyectos_middleware.is_propietario_or_administrador,
    proyectos_middleware.upload_file.fields([
        {name: "ruta_fichero", maxCount: 1},
        {name: "ruta_imagen", maxCount: 1}
    ]),
    proyectos_middleware.inject_file_path_to_body,
    proyectos_controller.update_proyecto
)
router.delete("/:proyecto_id",
    auth_middleware.get_and_verify_bearer_token,
    proyectos_middleware.is_propietario_or_administrador,
    proyectos_controller.delete_proyecto
)

module.exports = router