const {body} = require('express-validator')
const {validate} = require('.')

const create_codigo = [
    body('usos', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    create_codigo
}
