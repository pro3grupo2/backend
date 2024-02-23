// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const jwt = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// Funciones que verifica la validez de un token
const verify_token = (token) => {
    try {
        return jwt.verify(token, "proyectos3")
    } catch (e) {
        return null
    }
}

// Funciones que verifica si un usuario es administrador, creador o alumno
const is_administrador = async (usuario_id) => {
    const data = await prisma.administradores.findFirst({
        where: {
            id_usuario: usuario_id
        }
    })

    return !!data
}

const is_creador = async (usuario_id) => {
    const data = await prisma.creadores.findFirst({
        where: {
            id_usuario: usuario_id
        }
    })

    return !!data
}

const is_alumno = async (usuario_id) => {
    const data = await prisma.alumnos.findFirst({
        where: {
            id_usuario: usuario_id
        }
    })

    return !!data
}

// Funcion que obtiene un usuario y verifica si la contraseña es correcta devolviendo un Token (JWT)
const get_usuario_and_verify_password = async (correo, password) => {
    const data = await prisma.usuarios.findUnique({
        where: {
            correo: correo
        }
    })

    if (!data) return null
    if (data.password !== password) return null

    return jwt.sign({id: data.id}, "proyectos3", {expiresIn: '1d'})
}

// Funcion que obtiene un usuario a partir de un token
const get_usuario_by_token = async (token) => {
    const data = verify_token(token)
    return data ? await get_usuario_by_id(data.id) : null
}

// Funcion que obtiene un usuario a partir de su id
const get_usuario_by_id = async (usuario_id) => {
    return prisma.usuarios.findUnique({
        where: {
            id: usuario_id
        },
        select: {
            id: true,
            correo: true,
            nombre_completo: true,
            alias: true,
            proyectos: {
                select: {
                    id: true,
                    titulo: true,
                    ruta_imagen: true,
                }
            }
        }
    })
}

// Funcion que crea un usuario
const create_usuario = async (usuario) => {
    try {
        return await prisma.usuarios.create({
            data: usuario
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    verify_token,
    is_administrador,
    is_creador,
    is_alumno,
    get_usuario_and_verify_password,
    get_usuario_by_token,
    get_usuario_by_id,
    create_usuario
}