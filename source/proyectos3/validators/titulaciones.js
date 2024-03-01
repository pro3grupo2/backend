const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_titulacion = [
    param('titulacion_id', 'Type: Int').exists().toInt(),
    validate
]

const create_titulacion = [
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    validate
]

const update_titulacion = [
    param('titulacion_id', 'Type: Int').exists().toInt(),
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}).optional(),
    validate
]

const delete_titulacion = [
    param('titulacion_id', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    get_titulacion,
    create_titulacion,
    update_titulacion,
    delete_titulacion
}
