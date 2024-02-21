const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_alumnos = async (skip = 0, take = 20) => {
    return prisma.alumnos.findMany(
        {
            skip: skip,
            take: take,
            include: {
                usuarios: {
                    select: {
                        id: true,
                        correo: true,
                        nombre_completo: true,
                        alias: true
                    }
                },
                titulaciones: { 
                    select: {
                        id: true,
                        titulo: true
                    }
                }
            }
        }
    );
}

const get_alumno = async (alumno_id) => {
    return prisma.alumnos.findUnique({
        where: {
            id: alumno_id
        },
        include: {
            usuarios: {
                select: {
                    id: true,
                    correo: true,
                    nombre_completo: true,
                    alias: true
                }
            },
            titulaciones: {
                select: {
                    id: true,
                    titulo: true
                }
            }
        }
    })
}

const create_alumno = async (alumno) => {
    try {
        return await prisma.alumnos.create({
            data: {
                "id_usuario": alumno.id_usuario,
                "id_titulacion": alumno.id_titulacion,
                "promocion": alumno.promocion
            }
        })
    } catch (e) {
        return null
    }
}

const update_alumno = async (alumno_id, alumno_nuevo) => {
    try {
        return await prisma.alumnos.update({
            where: {
                id: alumno_id
            }, data: {
                id_usuario: alumno.id_usuario,
                id_titulacion: alumno.id_titulacion,
                promocion: alumno.promocion
            }
        })
    } catch (e) {
        return null
    }
}

const delete_alumno = async (alumno_id) => {
    try {
        return await prisma.alumnos.delete({
            where: {
                id: alumno_id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_alumnos,
    get_alumno,
    create_alumno,
    update_alumno,
    delete_alumno
}