const {body, query} = require('express-validator')
const {validate} = require('.')

/**
 * Validation rules for project filters
 * @type {ValidationChain[]}
 */
const filters = [
    query('premiado', 'Type: Bool').exists().notEmpty().toBoolean().optional(),
    query('anio', 'Type: Year (YYYY)').exists().notEmpty().toInt().optional(),
    query('titulaciones', 'Type: Int, Int, ..., Int').exists().notEmpty().customSanitizer(value => value.split(',').map((x) => parseInt(x))).optional(),
    query('busqueda', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    query('area', 'Type: Int').exists().notEmpty().toInt().optional(),
    validate
]

/**
 * Validation rules for creating project files
 * @type {ValidationChain[]}
 */
const create_proyecto_files = [
    body('url', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('portada', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    validate
]

/**
 * Validation rules for creating a project
 * @type {ValidationChain[]}
 */
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