const {body} = require('express-validator')
const {validate} = require('.')

const titulacion = [
    body('id_area', 'Type: Int').exists().isInt(),
    body('titulo', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}),
    validate
]

module.exports = {
    titulacion
}
