// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const jwt = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// Funciones que verifica la validez de un token
const verify_token = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

// Funcion que obtiene un usuario y verifica si la contraseña es correcta devolviendo un Token (JWT)
const get_usuario_and_verify_password = async (correo, password) => {
    const data = await prisma.usuarios.findUnique({
        where: {
            correo: correo
        }
    })

    if (data && data.password !== password) return null

    return jwt.sign({id: data.id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

// Funcion que obtiene un usuario a partir de un token
const get_usuario_by_token = async (token) => {
    const data = verify_token(token)
    return data ? await get_usuario_by_id(data.id) : null
}

// Funcion que obtiene un usuario a partir de su id
const get_usuario_by_id = async (id) => {
    return prisma.usuarios.findUnique({
        where: {
            id: id
        }
    })
}

// Funcion que crea un usuario
const create_usuario = async (usuario) => {
    try {
        return await prisma.usuarios.create({
            data: {
                "correo": usuario.correo,
                "nombre_completo": usuario.nombre_completo,
                "alias": usuario.alias,
                "password": usuario.password,
                "frase_recuperacion": usuario.frase_recuperacion
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    verify_token, get_usuario_and_verify_password, get_usuario_by_token, get_usuario_by_id, create_usuario
}