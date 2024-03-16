// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const prisma = require('../databases/mysql')
const redis = require('../databases/redis')
const {hook_updates} = require('../databases/discord')
const premios_errors = require('../errors/premios')

const guardar_cache = async (data, id = null) => {
    if (id) {
        await redis.set(`cached:premios:${id}`, JSON.stringify(data))
        await redis.expire(`cached:premios:${id}`, process.env.REDIS_SIGNIN_EXPIRES_IN)
    } else {
        await redis.set('cached:premios', JSON.stringify(data))
        await redis.expire('cached:premios', process.env.REDIS_SIGNIN_EXPIRES_IN)
    }
}

const leer_cache = async (id = null) => {
    if (id && await redis.exists(`cached:premios:${id}`))
        return JSON.parse(await redis.get(`cached:premios:${id}`))
    else if (await redis.exists('cached:premios'))
        return JSON.parse(await redis.get('cached:premios'))
    else
        return null
}

const limpiar_cache = async (id = null) => {
    if (await redis.exists('cached:premios'))
        await redis.del('cached:premios')

    if (id && await redis.exists(`cached:premios:${id}`))
        await redis.del(`cached:premios:${id}`)
}

const get_premios = async (skip = 0, take = 20) => {
    let data = leer_cache()
    if (data) return data

    data = await prisma.premios.findMany({
        skip: skip, take: take
    })

    if (!data)
        throw new Error(premios_errors.IS_EMPTY)

    await guardar_cache(data)
    await hook_updates.success("Premios cacheados", new Date().toISOString(), JSON.stringify(data))

    return data
}

const get_premio = async (id) => {
    let data = leer_cache(id)
    if (data) return data

    data = await prisma.premios.findUnique({
        where: {
            id: id
        }
    })

    if (!data)
        throw new Error(premios_errors.NOT_FOUND)

    await guardar_cache(data, id)
    await hook_updates.success("Premio cacheado", new Date().toISOString(), JSON.stringify(data))

    return data
}

const create_premio = async (premio) => {
    try {
        await limpiar_cache()

        const data = await prisma.premios.create({
            data: premio
        })

        await guardar_cache(data, data.id)
        await hook_updates.success("Premio creado", new Date().toISOString(), JSON.stringify(data))

        return data

    } catch (e) {
        throw new Error(`${premios_errors.WRONG_CREATE} : ${e.message}`)
    }
}

const update_premio = async (id, premio_nuevo) => {
    try {
        await limpiar_cache(id)

        const data = await prisma.premios.update({
            where: {
                id: id
            }, data: premio_nuevo
        })

        await guardar_cache(data, id)
        await hook_updates.success("Premio actualizado", new Date().toISOString(), JSON.stringify(data))

        return data
    } catch (e) {
        throw new Error(`${premios_errors.WRONG_UPDATE} : ${e.message}`)
    }
}

const delete_premio = async (id) => {
    try {
        await limpiar_cache(id)

        const data = await prisma.premios.delete({
            where: {
                id: id
            }
        })

        await guardar_cache(data, id)
        await hook_updates.success("Premio eliminado", new Date().toISOString(), JSON.stringify(data))

        return data
    } catch (e) {
        throw new Error(`${premios_errors.WRONG_DELETE} : ${e.message}`)
    }
}

module.exports = {
    get_premios, get_premio, create_premio, update_premio, delete_premio
}