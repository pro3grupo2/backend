// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")
const prisma = require('../databases/mysql')
const redis = require('../databases/redis')
const auth_errors = require("../errors/auth")
const {toInt} = require("validator");

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
            id: true, password: true, rol: true
        }
    })

    if (!data) throw auth_errors.WRONG_MAIL
    if (!bcryptjs.compareSync(password, data.password)) throw auth_errors.WRONG_PASSWORD

    return jwt.sign({id: data.id, rol: data.rol}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const signup_cache = async (usuario) => {
    try {
        const key = `${usuario.correo}_${Date.now()}`
        await redis.hSet(key, usuario)
        await redis.expire(key, 60 * 30)
        return jwt.sign({cache_key: key}, process.env.JWT_SECRET, {expiresIn: "30min"})
    } catch (e) {
        throw auth_errors.WRONG_SIGNUP
    }
}

const signup_validate = async (cache_key) => {
    if (!await redis.exists(cache_key)) throw auth_errors.INVALID_SIGNUP_TOKEN

    try {
        return await redis.hGetAll(cache_key)
    } catch (e) {
        throw auth_errors.WRONG_SIGNUP
    }
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
                rol: usuario.rol,
                promocion: toInt(usuario.promocion)
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
    verificar_JWT, signin, signup, signup_cache, signup_validate, me
}