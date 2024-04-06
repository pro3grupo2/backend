const express = require("express")

const proyectos_controller = require("../../controllers/proyectos")
const proyectos_middleware = require("../../middleware/proyectos")
const proyectos_validators = require("../../validators/proyectos")

const auth_middleware = require("../../middleware/auth")
const global_validators = require("../../validators")

const router = express.Router()

router.get("/", auth_middleware.verificar_JWT, global_validators.pagination, proyectos_validators.filters, proyectos_controller.get_proyectos)
router.get("/me", auth_middleware.verificar_JWT, proyectos_controller.get_proyectos)
router.get("/:id", auth_middleware.verificar_JWT, global_validators.params_id, proyectos_controller.get_proyecto)
router.get("/:id/aceptar", auth_middleware.verificar_JWT, global_validators.params_id, auth_middleware.is_administrador, proyectos_controller.aceptar_proyecto)
router.get("/:id/rechazar", auth_middleware.verificar_JWT, global_validators.params_id, auth_middleware.is_administrador, proyectos_controller.rechazar_proyecto)

router.post("/", auth_middleware.verificar_JWT, proyectos_validators.create_proyecto, proyectos_controller.create_proyecto)
router.post("/subir", auth_middleware.verificar_JWT, proyectos_middleware.upload_file.fields([{name: "url", maxCount: 1}, {name: "portada", maxCount: 1}]), proyectos_middleware.inject_file_path_to_body, proyectos_validators.create_proyecto_files, proyectos_controller.create_proyecto_files)

router.delete("/:id", auth_middleware.verificar_JWT, global_validators.params_id, auth_middleware.is_administrador, proyectos_controller.delete_proyecto)

module.exports = router
