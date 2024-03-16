const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")
const prisma = require('../databases/mysql')
const {exists, escribir_cache, limpiar_cache, leer_cache} = require('../databases/redis')
const auth_errors = require("../errors/auth")
const {hook_updates} = require("../databases/discord")

const verificar_JWT = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const get_data_by_correo = async (correo) => {
    let data = await leer_cache(`cached:${correo}`)
    if (data) return data

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

    if (!data) return null

    await escribir_cache([
        {
            key: `cached:${correo}`,
            data: data
        }
    ], process.env.REDIS_SIGNIN_EXPIRES_IN)
    await hook_updates.success("Nueva sesion iniciada", new Date().toISOString(), JSON.stringify(data))

    return data
}

const signin = async (correo, password) => {
    const data = await get_data_by_correo(correo)

    if (!data) {
        if (await exists(`pending:${correo}`))
            throw new Error(auth_errors.PENDING_SIGNUP)

        throw new Error(auth_errors.WRONG_MAIL)
    }

    if (!bcryptjs.compareSync(password, data.password))
        throw new Error(auth_errors.WRONG_PASSWORD)

    return jwt.sign({id: data.id, correo: data.correo, rol: data.rol}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SESSION_EXPIRES_IN})
}

const signup_cache = async (usuario) => {
    const key = `pending:${usuario.correo}`

    if (await exists(key))
        throw new Error(`${auth_errors.PENDING_SIGNUP} : ${usuario.correo}`)

    if (await get_data_by_correo(usuario.correo))
        throw new Error(`${auth_errors.ALREADY_SIGNUP} : ${usuario.correo}`)

    try {
        await escribir_cache([
            {
                key: key,
                data: usuario
            }
        ], process.env.REDIS_SIGNUP_EXPIRES_IN)
        await hook_updates.success("Nuevo usuario pendiente de registro", new Date().toISOString(), JSON.stringify(usuario))

        return jwt.sign({cache_key: key}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SIGNUP_EXPIRES_IN})
    } catch (e) {
        throw new Error(`${auth_errors.WRONG_SIGNUP} : ${usuario.correo}`)
    }
}

const signup_validate = async (cache_key) => {
    if (!await exists(cache_key))
        throw new Error(`${auth_errors.INVALID_SIGNUP_TOKEN} : ${cache_key}`)

    try {
        const data = await leer_cache(cache_key)
        await limpiar_cache([cache_key])
        await signup(data)
        await hook_updates.success("Nuevo usuario registrado", new Date().toISOString(), JSON.stringify(data))
    } catch (e) {
        throw new Error(`${auth_errors.WRONG_SIGNUP} : ${cache_key} : ${e.message}`)
    }
}

const signup = async (usuario) => {
    try {
        usuario.password = bcryptjs.hashSync(usuario.password)
        return await prisma.usuarios.create({
            data: usuario,
            select: {
                id: true, correo: true, nombre_completo: true, alias: true, rol: true, promocion: true
            }
        })
    } catch (e) {
        throw new Error(`${auth_errors.WRONG_SIGNUP} : ${usuario.correo} : ${e.message}`)
    }
}

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
