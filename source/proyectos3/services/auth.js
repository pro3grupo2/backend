// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")
const prisma = require('../databases/mysql')
const auth_errors = require("../errors/auth")

// Funciones que verifica la validez de un token
const verificar_JWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const signin = async (correo, password) => {
    const data = await prisma.usuarios.findUnique({
        where: {
            correo: correo
        }, select: {
            id: true, password: true, rol: true, validado: true
        }
    })

    if (!data) throw auth_errors.WRONG_MAIL
    if (!data.validado) throw auth_errors.USER_NOT_VALIDATED
    if (!bcryptjs.compareSync(password, data.password)) throw auth_errors.WRONG_PASSWORD

    return jwt.sign({id: data.id, rol: data.rol}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const signup = async (usuario) => {
    try {
        return await prisma.usuarios.create({
            data: {
                alias: usuario.alias,
                correo: usuario.correo,
                nombre_completo: usuario.nombre_completo,
                password: bcryptjs.hashSync(usuario.password),
                frase_recuperacion: usuario.frase_recuperacion,
                rol: usuario.rol
            }
        })
    } catch (e) {
        throw auth_errors.WRONG_SIGNUP
    }
}

// Funcion que obtiene un usuario a partir de su id
const me = async (id) => {
    return prisma.usuarios.findUnique({
        where: {
            id: id
        }, select: {
            id: true, correo: true, nombre_completo: true, alias: true, rol: true, proyectos: {
                select: {
                    id: true, titulo: true, portada: true
                }
            }
        }
    })
}

module.exports = {
    verificar_JWT, signin, signup, me
}