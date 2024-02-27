const {body, param} = require('express-validator')
const {validate} = require('./validation')

const get_premio = [
    param('premio_id', 'Type: Int').exists().toInt(),
    validate
]

const create_premio = [
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}),
    validate
]

const update_premio = [
    param('premio_id', 'Type: Int').exists().toInt(),
    body('titulo', 'Type: String, Max-Length: 50').exists().notEmpty().isString().isLength({max: 50}).optional(),
    validate
]

const delete_premio = [
    param('premio_id', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    get_premio,
    create_premio,
    update_premio,
    delete_premio
}
