// Dependencias necesarias para el manejo de tokens
const auth_service = require("../services/auth")
const auth_errors = require("../errors/auth")
const {bad_response} = require("../errors");

// Middleware para obtener y verificar el token de autorización
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

const is_administrador = (req, res, next) => {
    if (req.JWT.rol !== "coordinador")
        return bad_response(res, 401, new Error(`${auth_errors.NOT_ADMININSTRADOR} : ${req.JWT.correo}`))

    next()
}

module.exports = {
    verificar_JWT, is_administrador
}