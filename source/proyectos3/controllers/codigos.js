// Dependecias necesarias para el manejo de las rutas de autenticacion
const codigos_service = require('../services/codigos')
const codigos_errors = require('../errors/codigos')
const crypto = require("crypto");

const get_codigos = async (req, res) => {
    return res.send({
        data: await codigos_service.get_codigos(req.MATCHED.skip, req.MATCHED.take)
    })
}

const create_codigo = async (req, res) => {
    req.MATCHED.token = crypto.randomBytes(10).toString('hex')
    const data = await codigos_service.create_codigo(req.MATCHED)

    if (!data) return res.status(400).send({
        data: {
            errors: [codigos_errors.WRONG_CREATE]
        }
    })

    return res.send({
        data: data
    })
}

module.exports = {
    get_codigos, create_codigo
}