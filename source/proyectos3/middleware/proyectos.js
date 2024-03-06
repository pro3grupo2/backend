const multer = require('multer')
const fs = require("fs");
const proyectos_service = require("../services/proyectos")
const auth_service = require("../services/auth");
const proyectos_errors = require("../errors/proyectos");

const is_propietario_or_administrador = async (req, res, next) => {
    const {MATCHED, JWT} = req

    const data = await proyectos_service.get_proyecto(MATCHED.id)

    if (!data) return res.status(404).send({
        data: {
            errors: [proyectos_errors.NOT_FOUND]
        }
    })

    if (data.id_creador !== JWT.id && JWT.rol !== "coordinador") return res.status(401).send({
        data: {
            errors: [proyectos_errors.NOT_PROPIETARIO]
        }
    })

    next()
}

const upload_file = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            const path = "/files/" + req.JWT.id
            if (!fs.existsSync(path)) fs.mkdirSync(path, {recursive: true})
            callback(null, path)
        }, filename: function (req, file, callback) {
            callback(null, Date.now() + "." + file.originalname.split(".").pop())
        }
    })
})

const inject_file_path_to_body = (req, res, next) => {
    if (!req.files) return next()

    Object.keys(req.files).forEach(fichero => {
        req.body[fichero] = req.files[fichero][0].destination + req.files[fichero][0].filename
    })

    next()
}

module.exports = {
    is_propietario_or_administrador, upload_file, inject_file_path_to_body
}