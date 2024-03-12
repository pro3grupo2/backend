const express = require("express")
const recuperacion_controller = require("../../controllers/recuperacion")

const router = express.Router()

router.post("/",
    recuperacion_controller.enviarCorreo
)

module.exports = router