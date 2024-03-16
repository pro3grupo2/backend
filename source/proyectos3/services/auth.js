// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")
const prisma = require('../databases/mysql')
const redis = require('../databases/redis')
const auth_errors = require("../errors/auth")
const {hook_updates} = require("../databases/discord")

// Funciones que verifica la validez de un token
const verificar_JWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const get_data_by_correo = async (correo) => {
    let data
    if (await redis.exists(`cached:${correo}`)) data = JSON.parse(await redis.get(`cached:${correo}`))
    else {
        data = await prisma.usuarios.findUnique({
            where: {
                correo: correo
            }, include: {
                proyectos: {
                    select: {
                        id: true, titulo: true, portada: true
                    }
                }
            }
        })

        if (data) {
            await redis.set(`cached:${correo}`, JSON.stringify(data))
            await redis.expire(`cached:${correo}`, process.env.REDIS_SIGNIN_EXPIRES_IN)

            await hook_updates.success("Nueva sesion iniciada", new Date().toISOString(), JSON.stringify(data))
        }
    }

    return data
}

const signin = async (correo, password) => {
    const data = await get_data_by_correo(correo)

    if (!data) {
        if (await redis.exists(`pending:${correo}`))
            throw new Error(auth_errors.PENDING_SIGNUP)

        throw new Error(auth_errors.WRONG_MAIL)
    }

    if (!bcryptjs.compareSync(password, data.password))
        throw new Error(auth_errors.WRONG_PASSWORD)

    return jwt.sign({id: data.id, correo: data.correo, rol: data.rol}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SESSION_EXPIRES_IN})
}

const signup_cache = async (usuario) => {
    const key = `pending:${usuario.correo}`

    if (await redis.exists(key))
        throw new Error(`${auth_errors.PENDING_SIGNUP} : ${usuario.correo}`)

    if (await get_data_by_correo(usuario.correo))
        throw new Error(`${auth_errors.ALREADY_SIGNUP} : ${usuario.correo}`)

    try {
        await redis.set(key, JSON.stringify(usuario))
        await redis.expire(key, process.env.REDIS_SIGNUP_EXPIRES_IN)

        await hook_updates.success("Nuevo usuario pendiente de registro", new Date().toISOString(), JSON.stringify(usuario))

        return jwt.sign({cache_key: key}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SIGNUP_EXPIRES_IN})
    } catch (e) {
        throw new Error(`${auth_errors.WRONG_SIGNUP} : ${usuario.correo}`)
    }
}

const signup_validate = async (cache_key) => {
    if (!await redis.exists(cache_key))
        throw new Error(`${auth_errors.INVALID_SIGNUP_TOKEN} : ${cache_key}`)

    try {
        const data = JSON.parse(await redis.get(cache_key))
        await redis.del(cache_key)

        await hook_updates.success("Nuevo usuario registrado", new Date().toISOString(), JSON.stringify(data))

        return await signup(data)
    } catch (e) {
        throw new Error(`${auth_errors.WRONG_SIGNUP} : ${cache_key} : ${e.message}`)
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
                promocion: usuario.promocion
            }, select: {
                id: true, correo: true, nombre_completo: true, alias: true, rol: true, promocion: true
            }
        })
    } catch (e) {
        throw new Error(`${auth_errors.WRONG_SIGNUP} : ${usuario.correo} : ${e.message}`)
    }
}

// Funcion que obtiene un usuario a partir de su id
const me = async (correo) => {
    const data = await get_data_by_correo(correo)

    if (!data)
        throw new Error(`${auth_errors.NOT_FOUND} : ${correo}`)

    const {password, frase_recuperacion, ...user} = data
    return user
}

module.exports = {
    verificar_JWT, signin, signup, signup_cache, signup_validate, me
}
