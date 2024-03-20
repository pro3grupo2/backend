const {body} = require('express-validator')
const {validate} = require('.')

const asignatura = [
    body('titulo', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}),
    body('curso', 'Type: Int').exists().isInt(),
    validate
]

module.exports = {
    asignatura
}
