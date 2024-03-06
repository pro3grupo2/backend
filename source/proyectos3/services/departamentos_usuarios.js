const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_departamentos_usuarios = async (skip = 0, take = 20) => {
    return prisma.departamentos_usuarios.findMany(
        {
            skip: skip,
            take: take,
        }
    );
}

const get_departamentos_usuario = async (idUsuario, idDepartamento) => {
    return prisma.departamentos_usuarios.findUnique({
        where: {
            id_usuario_id_departamento: {
                id_usuario: idUsuario,
                id_departamento: idDepartamento,
            },
        }
    })
}

const create_departamentos_usuario = async (relacion) => {
    try {
        return await prisma.departamentos_usuarios.create({
            data: {
                id_usuario: relacion.id_usuario,
                id_departamento: relacion.id_departamento,
            },
        })
    } catch (e) {
        return null
    }
}

const update_departamentos_usuario = async (idUsuario, idDepartamento, relacionNueva) => {
    try {
        return await prisma.departamentos_usuarios.update({
            where: {
                id_usuario_id_departamento: {
                    id_usuario: idUsuario,
                    id_departamento: idDepartamento,
                },
            }, data: {
                id_usuario: relacionNueva.id_usuario,
                id_departamento: relacionNueva.id_departamento,
            }
        })
    } catch (e) {
        return null
    }
}

const delete_departamentos_usuario = async (idUsuario, idDepartamento) => {
    try {
        return await prisma.departamentos_usuarios.delete({
            where: {
                id_usuario_id_departamento: {
                    id_usuario: idUsuario,
                    id_departamento: idDepartamento,
                },
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_departamentos_usuarios,
    get_departamentos_usuario,
    create_departamentos_usuario,
    update_departamentos_usuario,
    delete_departamentos_usuario
}