const Hapi = require('@hapi/hapi')
const ContextStrategy = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoutes = require('./routes/heroRoutes')
const Joi = require('joi')

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
    app.route([
      ...mapRoutes(new HeroRoutes(context), HeroRoutes.methods())  
    ])
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)
    return app
}
module.exports = main()