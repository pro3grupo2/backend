const {body, param} = require('express-validator')
const {validate} = require('./validation')

// TODO: Agregar validación de existencia en la base de datos en todos los id

const get_proyecto = [
    param('proyecto_id', 'Type: Int').exists().toInt(),
    validate
]

const create_proyecto = [
    body('id_asignatura', 'Type: Int').exists().toInt().optional(),
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    body('ficha_tecnica', 'Type: String, Max-Length: None').exists().notEmpty().isString(),
    body('ruta_fichero', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    body('ruta_imagen', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}),
    validate
]

const update_proyecto = [
    param('proyecto_id', 'Type: Int').exists().toInt(),
    body('id_asignatura', 'Type: Int').exists().toInt().optional(),
    body('titulo', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    body('ficha_tecnica', 'Type: String, Max-Length: None').exists().notEmpty().isString().optional(),
    body('ruta_fichero', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    body('ruta_imagen', 'Type: String, Max-Length: 100').exists().notEmpty().isString().isLength({max: 100}).optional(),
    validate
]

const delete_proyecto = [
    param('proyecto_id', 'Type: Int').exists().toInt(),
    validate
]

module.exports = {
    get_proyecto,
    create_proyecto,
    update_proyecto,
    delete_proyecto
}
