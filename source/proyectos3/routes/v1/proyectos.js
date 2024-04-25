const express = require("express")

// Importing necessary modules
const proyectos_controller = require("../../controllers/proyectos")
const proyectos_middleware = require("../../middleware/proyectos")
const proyectos_validators = require("../../validators/proyectos")

const auth_middleware = require("../../middleware/auth")
const global_validators = require("../../validators")

// Creating a new router
const router = express.Router()

/**
 * @route GET /
 * @desc Fetch all projects
 * @access Private
 */
router.get("/", auth_middleware.verificar_JWT, global_validators.pagination, proyectos_validators.filters, proyectos_controller.get_proyectos)

/**
 * @route GET /me
 * @desc Fetch all projects of the authenticated user
 * @access Private
 */
router.get("/me", auth_middleware.verificar_JWT, proyectos_controller.get_me_proyectos)

/**
 * @route GET /pendientes
 * @desc Fetch all pending projects
 * @access Admin
 */
router.get("/pendientes", auth_middleware.verificar_JWT, auth_middleware.is_administrador, global_validators.pagination, proyectos_validators.filters, proyectos_controller.get_proyectos_pendientes)

/**
 * @route GET /rechazados
 * @desc Fetch all rejected projects
 * @access Admin
 */
router.get("/rechazados", auth_middleware.verificar_JWT, auth_middleware.is_administrador, global_validators.pagination, proyectos_validators.filters, proyectos_controller.get_proyectos_rechazados)

/**
 * @route GET /:id
 * @desc Fetch a project by id
 * @access Private
 */
router.get("/:id", auth_middleware.verificar_JWT, global_validators.params_id, proyectos_controller.get_proyecto)

/**
 * @route GET /:id/aceptar
 * @desc Accept a project by id
 * @access Admin
 */
router.get("/:id/aceptar", auth_middleware.verificar_JWT, global_validators.params_id, auth_middleware.is_administrador, proyectos_controller.aceptar_proyecto)

/**
 * @route GET /:id/rechazar
 * @desc Reject a project by id
 * @access Admin
 */
router.get("/:id/rechazar", auth_middleware.verificar_JWT, global_validators.params_id, auth_middleware.is_administrador, proyectos_controller.rechazar_proyecto)

/**
 * @route POST /
 * @desc Create a new project
 * @access Private
 */
router.post("/", auth_middleware.verificar_JWT, proyectos_validators.create_proyecto, proyectos_controller.create_proyecto)

/**
 * @route POST /subir
 * @desc Upload files for a new project
 * @access Private
 */
router.post("/subir", auth_middleware.verificar_JWT, proyectos_middleware.upload_file.fields([{name: "url", maxCount: 1}, {name: "portada", maxCount: 1}]), proyectos_middleware.inject_file_path_to_body, proyectos_validators.create_proyecto_files, proyectos_controller.create_proyecto_files)

/**
 * @route PATCH /:id
 * @desc Update a project by its ID
 * @access Admin
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.patch("/:id", auth_middleware.verificar_JWT, global_validators.params_id, auth_middleware.is_administrador, proyectos_validators.patch_proyecto, proyectos_controller.patch_proyecto)

/**
 * @route DELETE /:id
 * @desc Delete a project by id
 * @access Admin
 */
router.delete("/:id", auth_middleware.verificar_JWT, global_validators.params_id, auth_middleware.is_administrador, proyectos_controller.delete_proyecto)

// Exporting the router
module.exports = router