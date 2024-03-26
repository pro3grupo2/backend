const prisma = require('../databases/mysql')

const areas_errors = require('../errors/areas')

const get_areas = async () => {
    return prisma.areas.findMany({})
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
        throw new Error(`${areas_errors.WRONG_CREATE}: ${e.message}`)
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
        throw new Error(`${areas_errors.WRONG_UPDATE}: ${e.message}`)
    }
}

module.exports = {
    get_areas, get_area, create_area, update_area
}
