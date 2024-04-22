const jwt = require('jsonwebtoken')
const bcryptjs = require("bcryptjs")
const nodemailer = require("nodemailer")

const prisma = require('../databases/mysql')
const {hook_updates} = require("../databases/discord")
const {exists, escribir_cache, limpiar_cache, leer_cache} = require('../databases/redis')

const auth_errors = require("../errors/auth")
const recover_mail = require("../mails/recover")
const validation_mail = require("../mails/validation")

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
        }
    })

    if (!data) return null

    await escribir_cache([
        {
            key: `cached:${correo}`,
            data: data
        }
    ], process.env.REDIS_SIGNIN_EXPIRES_IN)
    await hook_updates.success("Nueva sesion iniciada", new Date().toISOString(), JSON.stringify(data).substring(0, 1024))

    return data
}

const signin = async (correo, password) => {
    const data = await get_data_by_correo(correo)

    if (!data) {
        if (await exists(`pending:${correo}`))
            throw new Error(auth_errors.PENDING_SIGNUP)

        throw new Error(`${auth_errors.WRONG_MAIL} : ${correo}`)
    }

    if (!bcryptjs.compareSync(password, data.password))
        throw new Error(auth_errors.WRONG_PASSWORD)

    return jwt.sign({id: data.id, correo: data.correo}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SESSION_EXPIRES_IN})
}

const signup_cache = async (usuario) => {
    const key = `pending:${usuario.correo}`
    const verificacion_correo = {
        'alumno': '@live.u-tad.com',
        'alumni': '@live.u-tad.com',
        'profesor': '@u-tad.com',
        'coordinador': '@u-tad.com',
        'externo': '@ext.u-tad.com'
    }

    if (!usuario.correo.endsWith(verificacion_correo[usuario.rol]))
        throw new Error(`${auth_errors.WRONG_DOMAIN_ROL} : ${usuario.correo} : ${usuario.rol}`)

    if (await exists(key))
        throw new Error(`${auth_errors.PENDING_SIGNUP} : ${usuario.correo}`)

    if (await get_data_by_correo(usuario.correo))
        throw new Error(`${auth_errors.ALREADY_SIGNUP} : ${usuario.correo}`)

    if (usuario.rol === "coordinador") {
        if (!usuario.codigo) throw new Error(`${auth_errors.NEED_CODIGO} : ${usuario.correo}`)

        const codigo = await prisma.codigos.findUnique({
            where: {
                codigo: usuario.codigo
            }
        })

        if (!codigo) throw new Error(`${auth_errors.INVALID_CODIGO} : ${usuario.correo} : ${usuario.codigo}`)
        if (codigo.usos === 0) throw new Error(`${auth_errors.USED_CODIGO} : ${usuario.correo} : ${usuario.codigo}`)

        await prisma.codigos.update({
            where: {
                codigo: usuario.codigo
            },
            data: {
                usos: {
                    decrement: 1
                }
            }
        })
    }

    try {
        const
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'recuperacion.repositorio.utad@gmail.com',
                    pass: 'sfxn ucvq enin goeh',
                },
            }),
            mailOptions = {
                from: 'recuperacion.repositorio.utad@gmail.com',
                to: usuario.correo,
                subject: "Verificacion de tu cuenta U-Tad",
                html: validation_mail
                    .replace(/{{to_link}}/g, "https://reservorio-u-tad.com/validate/" + jwt.sign({cache_key: key}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SIGNUP_EXPIRES_IN})),
                attachments: [{
                    filename: 'validation.png',
                    path: __dirname + '/images/validation.png',
                    cid: 'imagen2' 
                }]
            }

        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) reject(error)
                else resolve(info)
            })
        })

        await escribir_cache([
            {
                key: key,
                data: usuario
            }
        ], process.env.REDIS_SIGNUP_EXPIRES_IN)
        await hook_updates.success("Nuevo usuario pendiente de registro", new Date().toISOString(), JSON.stringify(usuario).substring(0, 1024))

        return "Correo enviado"

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

        const d = await signup(data)
        await hook_updates.success("Nuevo usuario registrado", new Date().toISOString(), JSON.stringify(data).substring(0, 1024))

        return d
    } catch (e) {
        throw new Error(`${auth_errors.WRONG_SIGNUP} : ${cache_key} : ${e.message}`)
    }
}

const signup = async (usuario) => {
    try {
        usuario.password = bcryptjs.hashSync(usuario.password)
        return await prisma.usuarios.create({
            data: {
                correo: usuario.correo,
                alias: usuario.alias,
                nombre_completo: usuario.nombre_completo,
                password: usuario.password,
                descripcion: usuario.descripcion,
                portfolio: usuario.portfolio,
                foto: usuario.foto,
                rol: usuario.rol,
                promocion: usuario.promocion
            },
            select: {
                id: true, correo: true, alias: true, nombre_completo: true, descripcion: true, portfolio: true, foto: true, promocion: true, rol: true
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

    const {password, ...user} = data
    return user
}

const recover = async (correo) => {
    const data = await get_data_by_correo(correo)

    if (!data)
        throw new Error(`${auth_errors.NOT_FOUND} : ${correo}`)

    const
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'recuperacion.repositorio.utad@gmail.com',
                pass: 'sfxn ucvq enin goeh',
            },
        }),
        mailOptions = {
            from: 'recuperacion.repositorio.utad@gmail.com',
            to: correo,
            subject: "Recuperacion de contraseña U-Tad",
            html: recover_mail
                .replace('{{correo}}', correo)
                .replace('{{to_link}}', "https://reservorio-u-tad.com/recover/" + jwt.sign({id: data.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_RECOVER_EXPIRES_IN})),
            attachments: [{
                filename: 'recover.png',
                path: __dirname + '/images/recover.png',
                cid: 'imagen1' 
            }]
        }

    try {
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) reject(error)
                else resolve(info)
            })
        })

        return "Correo enviado"

    } catch (error) {
        throw new Error(`${auth_errors.WRONG_SEND} : ${correo}`)
    }
}

module.exports = {
    verificar_JWT, get_data_by_correo, signin, signup, signup_cache, signup_validate, me, recover
}
