const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_departamentos = async (skip = 0, take = 20) => {
    return prisma.departamentos.findMany({
        skip: skip, take: take,
    })
}

const get_departamento = async (id) => {
    return prisma.departamentos.findUnique({
        where: {
            id: id
        }
    })
}

const create_departamento = async (departamento) => {
    try {
        return await prisma.departamentos.create({
            data: departamento
        })
    } catch (e) {
        return null
    }
}

const update_departamento = async (id, departamento_nueva) => {
    try {
        return await prisma.departamentos.update({
            where: {
                id: id
            }, data: departamento_nueva
        })
    } catch (e) {
        return null
    }
}

const delete_departamento = async (id) => {
    try {
        return await prisma.departamentos.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_departamentos, get_departamento, create_departamento, update_departamento, delete_departamento
}