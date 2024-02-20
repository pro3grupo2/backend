// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const {signup, signin, me} = require("../../controllers/auth")
const {get_and_verify_bearer_token} = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/me", get_and_verify_bearer_token, me)
router.post("/signin", signin)
router.post("/signup", signup)

module.exports = router