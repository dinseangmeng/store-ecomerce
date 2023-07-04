
const RedisStore = require("connect-redis").default
const session= require( "express-session")
const {createClient} =require( "redis")

module.exports = async (app) => {
  let redisClient =  createClient()
  redisClient.connect().catch(console.error)

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
  })

  app.use(session({
    store: redisStore,
    secret: 'my-secret',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    name: 'access_token',
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
      secure: false,
    }
  })
  )
}