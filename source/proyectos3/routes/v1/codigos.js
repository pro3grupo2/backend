const express = require("express")

const codigos_controller = require("../../controllers/codigos")
const codigos_validators = require("../../validators/codigos")

const auth_middleware = require("../../middleware/auth")
const global_validators = require("../../validators")

const router = express.Router()

/**
 * Route serving a list of codes
 * @name get/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/", auth_middleware.verificar_JWT, auth_middleware.is_administrador, codigos_controller.get_codigos)

/**
 * Route serving a creation of code
 * @name post/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/", auth_middleware.verificar_JWT, auth_middleware.is_administrador, codigos_validators.create_codigo, codigos_controller.create_codigo)

/**
 * Route serving a deletion of code by ID
 * @name delete/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.delete("/:id", auth_middleware.verificar_JWT, auth_middleware.is_administrador, global_validators.params_id, codigos_controller.delete_codigo)

module.exports = router