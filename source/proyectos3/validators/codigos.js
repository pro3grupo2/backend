const {body, param} = require('express-validator')
const {validate} = require('.')

const get_id = [
    param('id', 'Type: Int').exists().toInt(),
    validate
]

const create_codigo = [
    body('usos', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    get_id,
    create_codigo
}
