const {body, param} = require('express-validator')
const {validate} = require('./validation')


const get_premio = [
    param('premio_id').toInt(),
    validate
]

const create_premio = [
    body('titulo').isString().notEmpty(),
    validate
]

const update_premio = [
    param('premio_id').toInt(),
    body('titulo').isString().notEmpty(),
    validate
]

const delete_premio = [
    param('premio_id').toInt(),
    validate
]

module.exports = {
    get_premio,
    create_premio,
    update_premio,
    delete_premio
}
