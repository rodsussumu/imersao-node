const Hapi = require('@hapi/hapi')
const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')
const Joi = require('joi')

const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')

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
        Vision, Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    app.route([
      ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())  
    ])
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
    return app
}
module.exports = main()