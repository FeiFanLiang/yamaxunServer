module.exports = (app) => {
    app.sessionStore = {
        async get(key) {
            const res = await app.redis.get(key)
            if (!res) return null
            return JSON.parse(res)
        },
        async set(key, value, maxAge) {
            maxAge = maxAge ? maxAge : 60 * 1000
            value = JSON.stringify(value);
            await app.redis.set(key, value, 'PX', maxAge)
        },
        async destroy(key) {
            await app.redis.del(key)
        }
    }
}