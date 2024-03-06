const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_id = [
    param('id', 'Type: Int').exists().toInt(),
    validate
]

const create_proyecto = [
    body('id_asignatura', 'Type: Int').exists().toInt().optional(),
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    body('ficha', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('url', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('portada', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('participantes', 'Type: Array[Int]').exists().notEmpty().isArray().optional(),
    validate
]

const update_proyecto = [
    param('id', 'Type: Int').exists().toInt(),
    body('id_asignatura', 'Type: Int').exists().toInt().optional(),
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    body('ficha', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('url', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('portada', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('participantes', 'Type: Array[Int]').exists().notEmpty().isArray().optional(),
    validate
]

module.exports = {
    get_id,
    create_proyecto,
    update_proyecto
}
