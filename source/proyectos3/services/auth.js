// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const jwt = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

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

    if (!data) return null
    if (data.password !== password) return null // TODO: Agregar cifrado

    return jwt.sign({id: data.id, rol: data.rol}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

const signup = async (usuario) => {
    try {
        return await prisma.usuarios.create({
            data: {
                alias: usuario.alias, correo: usuario.correo, nombre_completo: usuario.nombre_completo, password: usuario.password, // TODO: Agregar cifrado
                frase_recuperacion: usuario.frase_recuperacion, rol: usuario.rol
            }
        })
    } catch (e) {
        return null
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