const {createClient} = require('redis')

const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on('error', () => console.log('Redis Client Error'))
redis.on('connect', () => console.log('Redis Client Connected'))
redis.on('ready', () => console.log('Redis Client Ready'))
redis.on('end', () => console.log('Redis Client End'))

redis.connect().catch(console.error)

module.exports = redis
