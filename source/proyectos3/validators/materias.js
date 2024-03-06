const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_materia = [
    param('premio_id', 'Type: Int').exists().toInt(),
    validate
]

const create_materia = [
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    validate
]

const update_materia = [
    param('premio_id', 'Type: Int').exists().toInt(),
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}).optional(),
    validate
]

const delete_materia = [
    param('premio_id', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    get_materia,
    create_materia,
    update_materia,
    delete_materia
}
