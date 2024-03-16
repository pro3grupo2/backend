// Dependencias necesarias para la interacción con la base de datos y la creación de tokens
const prisma = require('../databases/mysql')
const {escribir_cache, leer_cache, limpiar_cache} = require('../databases/redis')
const {hook_updates} = require('../databases/discord')
const premios_errors = require('../errors/premios')

const get_premios = async (skip = 0, take = 20) => {
    let data = await leer_cache('cached:premios')
    if (data) return data

    data = await prisma.premios.findMany({
        skip: skip, take: take
    })

    if (!data)
        throw new Error(premios_errors.IS_EMPTY)

    await escribir_cache([
        {
            key: 'cached:premios',
            data: data
        }
    ], process.env.REDIS_SIGNIN_EXPIRES_IN)
    await hook_updates.success("Premios cacheados", new Date().toISOString(), JSON.stringify(data))

    return data
}

const get_premio = async (id) => {
    let data = await leer_cache(`cached:premios:${id}`)
    if (data) return data

    data = await prisma.premios.findUnique({
        where: {
            id: id
        }
    })

    if (!data)
        throw new Error(premios_errors.NOT_FOUND)

    await escribir_cache([
        {
            key: `cached:premios:${id}`,
            data: data
        }
    ], process.env.REDIS_SIGNIN_EXPIRES_IN)
    await hook_updates.success("Premio cacheado", new Date().toISOString(), JSON.stringify(data))

    return data
}

const create_premio = async (premio) => {
    try {
        await limpiar_cache([
            'cached:premios'
        ])

        const data = await prisma.premios.create({
            data: premio
        })

        await escribir_cache([
            {
                key: `cached:premios:${data.id}`,
                data: data
            }
        ], process.env.REDIS_SIGNIN_EXPIRES_IN)
        await hook_updates.success("Premio creado", new Date().toISOString(), JSON.stringify(data))

        return data

    } catch (e) {
        throw new Error(`${premios_errors.WRONG_CREATE} : ${e.message}`)
    }
}

const update_premio = async (id, premio_nuevo) => {
    try {
        await limpiar_cache([
            'cached:premios',
            `cached:premios:${id}`
        ])

        const data = await prisma.premios.update({
            where: {
                id: id
            }, data: premio_nuevo
        })

        await escribir_cache([
            {
                key: `cached:premios:${data.id}`,
                data: data
            }
        ], process.env.REDIS_SIGNIN_EXPIRES_IN)
        await hook_updates.success("Premio actualizado", new Date().toISOString(), JSON.stringify(data))

        return data
    } catch (e) {
        throw new Error(`${premios_errors.WRONG_UPDATE} : ${e.message}`)
    }
}

const delete_premio = async (id) => {
    try {
        await limpiar_cache([
            'cached:premios',
            `cached:premios:${id}`
        ])

        const data = await prisma.premios.delete({
            where: {
                id: id
            }
        })

        await hook_updates.success("Premio eliminado", new Date().toISOString(), JSON.stringify(data))

        return data
    } catch (e) {
        throw new Error(`${premios_errors.WRONG_DELETE} : ${e.message}`)
    }
}

module.exports = {
    get_premios, get_premio, create_premio, update_premio, delete_premio
}