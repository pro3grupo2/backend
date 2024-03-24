const {body} = require('express-validator')
const {validate} = require('.')

const area = [
    body('titulo', 'Type: String, Max-Length: 200').exists().notEmpty().isString().isLength({max: 200}),
    validate
]

module.exports = {
    area
}
