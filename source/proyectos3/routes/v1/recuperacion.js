const express = require("express")
const recuperacion_controller = require("../../controllers/recuperacion")
const recuperacion_validator = require("../../validators/recuperacion")
const router = express.Router()

router.post("/",
    recuperacion_validator.enviarCorreo,
    recuperacion_controller.enviarCorreo
)

module.exports = router