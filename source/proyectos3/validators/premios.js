const {body, param} = require('express-validator')
const {validate} = require('./validation')


const get_premio = [
    param('premio_id', 'Type: Int').toInt(),
    validate
]

const create_premio = [
    body('titulo', 'Type: String, Max-Length: 50').isString().notEmpty().isLength({max: 50}),
    validate
]

const update_premio = [
    param('premio_id', 'Type: Int').toInt(),
    body('titulo', 'Type: String, Max-Length: 50').isString().notEmpty().isLength({max: 50}),

    validate
]

const delete_premio = [
    param('premio_id', 'Type: Int').toInt(),
    validate
]

module.exports = {
    get_premio,
    create_premio,
    update_premio,
    delete_premio
}
