const {body, param} = require('express-validator')
const {validate} = require('.')

const create_proyecto_files = [
    body('url', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('portada', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    validate
]

const create_proyecto = [
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    body('ficha', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('url', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('portada', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('participantes', 'Type: Array[Email]').default([]).exists().notEmpty().isArray(),
    body('asignaturas', 'Type: Array[Int]').default([]).exists().notEmpty().isArray(),
    body('premios', 'Type: Array[String]').default([]).exists().notEmpty().isArray(),
    validate
]


module.exports = {
    create_proyecto_files,
    create_proyecto
}
