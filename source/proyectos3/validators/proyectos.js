const {body, query} = require('express-validator')
const {validate} = require('.')

const filters = [
    query('premiado', 'Type: Bool').exists().notEmpty().toBoolean().optional(),
    query('anio', 'Type: Year (YYYY)').exists().notEmpty().toInt().optional(),
    query('titulaciones', 'Type: Int, Int, ..., Int').exists().notEmpty().customSanitizer(value => value.split(',').map(parseInt)).optional(),
    query('busqueda', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    validate
]

const create_proyecto_files = [
    body('url', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('portada', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    validate
]

const create_proyecto = [
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 200}),
    body('ficha', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('url', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('portada', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('participantes', 'Type: Array[Email]').default([]).exists().notEmpty().isArray(),
    body('asignaturas', 'Type: Array[Int]').default([]).exists().notEmpty().isArray(),
    body('premios', 'Type: Array[String]').default([]).exists().notEmpty().isArray(),
    body('premiado', 'Type: Bool').exists().notEmpty().isBoolean(),
    body('anio', 'Type: Year (YYYY)').exists().notEmpty().isInt(),
    validate
]

module.exports = {
    filters,
    create_proyecto_files,
    create_proyecto
}
