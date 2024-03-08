// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const get_areas = async (skip = 0, take = 20) => {
    return prisma.areas.findMany(
        {
            skip: skip,
            take: take
        }
    )
}

const get_area = async (id) => {
    return prisma.areas.findUnique({
        where: {
            id: id
        }
    })
}

const create_area = async (area) => {
    try {
        return await prisma.areas.create({
            data: area
        })
    } catch (e) {
        return null
    }
}

const update_area = async (id, area_nuevo) => {
    try {
        return await prisma.areas.update({
            where: {
                id: id
            }, data: area_nuevo
        })
    } catch (e) {
        return null
    }
}

const delete_area = async (id) => {
    try {
        return await prisma.areas.delete({
            where: {
                id: id
            }
        })
    } catch (e) {
        return null
    }
}

module.exports = {
    get_areas,
    get_area,
    create_area,
    update_area,
    delete_area
}