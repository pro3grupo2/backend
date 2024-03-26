const multer = require('multer')
const fs = require("fs")

const {bad_response} = require("../errors");
const {exists, leer_cache} = require("../databases/redis");

const proyectos_service = require("../services/proyectos")
const proyectos_errors = require("../errors/proyectos")
const auth_errors = require("../errors/auth");

const is_propietario_or_administrador = async (req, res, next) => {
    if (!await exists(`cached:${req.JWT.correo}`))
        return bad_response(res, 401, new Error(`${auth_errors.TOKEN_EXPIRED_OR_INVALID} : ${req.JWT.correo}`))

    const usuario = await leer_cache(`cached:${req.JWT.correo}`)
    const proyecto = await proyectos_service.get_proyecto(req.MATCHED.id)
    if (!proyecto)
        return bad_response(res, 404, new Error(`${proyectos_errors.NOT_FOUND}: ${req.MATCHED.id}`))

    if (proyecto.id_creador !== req.JWT.id && usuario.rol !== "coordinador")
        return bad_response(res, 401, new Error(`${proyectos_errors.NOT_PROPIETARIO} : ${req.JWT.correo} : ${req.MATCHED.id}`))

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
    if (!req.files)
        return next()

    Object.keys(req.files).forEach(fichero => {
        req.body[fichero] = req.files[fichero][0].destination + "/" + req.files[fichero][0].filename
    })

    next()
}

module.exports = {
    is_propietario_or_administrador, upload_file, inject_file_path_to_body
}