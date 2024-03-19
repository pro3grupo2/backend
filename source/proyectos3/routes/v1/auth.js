// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const auth_controller = require("../../controllers/auth")
const auth_middleware = require("../../middleware/auth")
const auth_validators = require("../../validators/auth")


// Rutas de autenticacion
const router = express.Router()

router.get("/me", auth_middleware.verificar_JWT, auth_controller.me)
router.post("/signin", auth_validators.signin, auth_controller.signin)
router.post("/signup", auth_validators.signup, auth_controller.signup)
router.get("/signup/validate", auth_middleware.verificar_JWT, auth_controller.signup_validate)
router.post("/recover", auth_validators.recover, auth_controller.recover)

module.exports = router