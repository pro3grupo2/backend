const {createClient} = require('redis')

const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on('error', () => console.log('Redis Client Error'))
redis.on('connect', () => console.log('Redis Client Connected'))
redis.on('ready', () => console.log('Redis Client Ready'))
redis.on('end', () => console.log('Redis Client End'))

redis.connect().catch(console.error)

const exists = async (key) => {
    return await redis.exists(key)
}

const leer_cache = async (key) => {
    return await exists(key)
        ? JSON.parse(await redis.get(key))
        : null
}

const escribir_cache = async (data, expires = null) => {
    data.map(
        async (d) => {
            await redis.set(d.key, JSON.stringify(d.data))
            if (expires)
                await redis.expire(d.key, expires)
        }
    )
}

const limpiar_cache = async (keys = null) => {
    if (!keys) await redis.flushAll()
    for (let key of keys) if (await redis.exists(key))
        await redis.del(key)
}

module.exports = {
    redis,
    exists,
    leer_cache,
    escribir_cache,
    limpiar_cache
}
