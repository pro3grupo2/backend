// Dependecias necesarias para el manejo de las rutas de autenticacion
const express = require("express")
const premios_controller = require("../../controllers/premios")
const {get_and_verify_bearer_token, is_administrador} = require("../../middleware/auth")

// Rutas de autenticacion
const router = express.Router()

router.get("/", get_and_verify_bearer_token, premios_controller.get_premios)
router.get("/:premio_id", get_and_verify_bearer_token, premios_controller.get_premio)
router.post("/", get_and_verify_bearer_token, is_administrador, premios_controller.create_premio)
router.put("/:premio_id", get_and_verify_bearer_token, is_administrador, premios_controller.update_premio)
router.delete("/:premio_id", get_and_verify_bearer_token, is_administrador, premios_controller.delete_premio)

module.exports = router