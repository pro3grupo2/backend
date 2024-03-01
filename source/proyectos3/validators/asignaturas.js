const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_asignatura = [
    param('asignatura_id', 'Type: Int').exists().toInt(),
    validate
]

const create_asignatura = [
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    body('curso', 'Type: Int').exists().toInt(),
    body('letra', 'Type: String, Max-Length: 1').exists().notEmpty().isString().isLength({max: 1}),
    validate
]

const update_asignatura = [
    param('asignatura_id', 'Type: Int').exists().toInt(),
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}).optional(),
    body('curso', 'Type: Int').exists().toInt().optional(),
    body('letra', 'Type: String, Max-Length: 1').exists().notEmpty().isString().isLength({max: 1}).optional(),
    validate
]

const delete_asignatura = [
    param('asignatura_id', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    get_asignatura,
    create_asignatura,
    update_asignatura,
    delete_asignatura
}
