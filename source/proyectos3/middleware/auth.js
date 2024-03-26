const {bad_response} = require("../errors");
const {exists, leer_cache} = require('../databases/redis')

const auth_service = require("../services/auth")
const auth_errors = require("../errors/auth")

const verificar_JWT = (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization)
        return bad_response(res, 401, new Error(auth_errors.TOKEN_NEEDED))

    const [_, token] = authorization.split(" ")
    const data = auth_service.verificar_JWT(token)

    if (!data)
        return bad_response(res, 401, new Error(`${auth_errors.TOKEN_EXPIRED_OR_INVALID} : ${token}`))

    req.JWT = data
    next()
}

const is_administrador = async (req, res, next) => {
    if (!await exists(`cached:${req.JWT.correo}`))
        return bad_response(res, 401, new Error(`${auth_errors.TOKEN_EXPIRED_OR_INVALID} : ${req.JWT.correo}`))

    const data = await leer_cache(`cached:${req.JWT.correo}`)
    if (data.rol !== "coordinador")
        return bad_response(res, 401, new Error(`${auth_errors.NOT_ADMININSTRADOR} : ${req.JWT.correo}`))

    next()
}

module.exports = {
    verificar_JWT, is_administrador
}