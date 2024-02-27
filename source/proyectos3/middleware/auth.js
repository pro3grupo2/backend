// Dependencias necesarias para el manejo de tokens
const auth_service = require("../services/auth")
const auth_errors = require("../errors/auth")

// Middleware para obtener y verificar el token de autorización
const get_and_verify_bearer_token = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) return res.status(401).send({
        data: {
            errors: [auth_errors.TOKEN_NEEDED]
        }
    })

    const [_, token] = authorization.split(" ")
    const data = auth_service.verify_token(token)

    if (!data) return res.status(401).send({
        data: {
            errors: [auth_errors.TOKEN_EXPIRED_OR_INVALID]
        }
    })

    req.usuario_id = data.id
    next()
}

// Middleware para verificar si el usuario es administrador despues de verificar el token
const is_administrador = async (req, res, next) => {
    const {usuario_id} = req

    if (!usuario_id) return res.status(401).send({
        data: {
            errors: [auth_errors.TOKEN_NEEDED]
        }
    })

    if (!await auth_service.is_administrador(usuario_id)) return res.status(403).send({
        data: {
            errors: [auth_errors.NOT_ADMININSTRADOR]
        }
    })

    next()
}

// Middleware para verificar si el usuario es creador despues de verificar el token
const is_creador = async (req, res, next) => {
    const {usuario_id} = req

    if (!usuario_id) return res.status(401).send({
        data: {
            errors: [auth_errors.TOKEN_NEEDED]
        }
    })

    if (!await auth_service.is_creador(usuario_id)) return res.status(403).send({
        data: {
            errors: [auth_errors.NOT_CREADOR]
        }
    })

    next()
}

// Middleware para verificar si el usuario es alumno despues de verificar el token
const is_alumno = async (req, res, next) => {
    const {usuario_id} = req

    if (!usuario_id) return res.status(401).send({
        data: {
            errors: [auth_errors.TOKEN_NEEDED]
        }
    })

    if (!await auth_service.is_alumno(usuario_id)) return res.status(403).send({
        data: {
            errors: [auth_errors.NOT_ALUMNO]
        }
    })

    next()
}

module.exports = {
    get_and_verify_bearer_token, is_administrador, is_creador, is_alumno
}