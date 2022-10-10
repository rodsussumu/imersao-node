const Hapi = require('@hapi/hapi')
const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')
const AuthRoutes = require('./routes/authRoutes')

const Joi = require('joi')

const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MEU_SEGREDAO_123'
const app = new Hapi.Server({
    port: 5000,
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new ContextStrategy(new MongoDb(connection, HeroiSchema))
    app.validator(Joi)
    const swaggerOptions = {
        info: {
            title: 'Api Herois - #ImersaoNode',
            version: 'v1',
        },
    }
    await app.register([
        HapiJwt, Vision, Inert, 
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        options: {
            expiresIn: 20
        },
        validate: (dado, request) => {
            return {
                isValid: true
            }
        }
    })
    app.auth.default('jwt')
    app.route([
      ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
      ...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods())
    ])
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
    return app
}
module.exports = main()