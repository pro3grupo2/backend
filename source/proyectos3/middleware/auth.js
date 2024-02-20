// Dependencias necesarias para el manejo de tokens
const {verify_token} = require("../services/auth")

// Middleware para obtener y verificar el token de autorización
const get_and_verify_bearer_token = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) return res.status(401).send({data: "Unauthorized"})

    const [bearer, token] = authorization.split(" ")
    const data = verify_token(token)

    if (!data) return res.status(401).send({data: "Unauthorized"})

    req.id = data.id
    next()
}

module.exports = {
    get_and_verify_bearer_token
}