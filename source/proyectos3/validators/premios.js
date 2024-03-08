const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_id = [
    param('id', 'Type: Int').exists().toInt(),
    validate
]

const create_premio = [
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    validate
]

const update_premio = [
    param('id', 'Type: Int').exists().toInt(),
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}).optional(),
    validate
]

module.exports = {
    get_id,
    create_premio,
    update_premio
}
