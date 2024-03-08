const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_id = [
    param('id', 'Type: Int').exists().toInt(),
    validate
]

const create_departamento = [
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    validate
]

const update_departamento = [
    param('id', 'Type: Int').exists().toInt(),
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}).optional(),
    validate
]

module.exports = {
    get_id,
    create_departamento,
    update_departamento
}
