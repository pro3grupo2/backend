// Dependencias necesarias para el manejo de tokens
const auth_service = require("../services/auth")
const auth_errors = require("../errors/auth")

// Middleware para obtener y verificar el token de autorización
const verificar_JWT = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) return res.status(401).send({
        data: {
            errors: [auth_errors.TOKEN_NEEDED]
        }
    })

    const [_, token] = authorization.split(" ")
    const data = auth_service.verificar_JWT(token)

    if (!data) return res.status(401).send({
        data: {
            errors: [auth_errors.TOKEN_EXPIRED_OR_INVALID]
        }
    })

    req.JWT = data
    next()
}

module.exports = {
    verificar_JWT
}