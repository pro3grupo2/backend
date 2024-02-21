// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const auth_controller = require("../../controllers/auth")
const auth_middleware = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/me",
    auth_middleware.get_and_verify_bearer_token,
    auth_controller.me
)
router.post("/signin",
    auth_controller.signin
)
router.post("/signup",
    auth_controller.signup
)

module.exports = router