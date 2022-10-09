class NotImplementedException extends Error {
    constructor() {
        super("Not Implemented Exception")
    }
}


const contextMongo = new ContextStrategy(new MongoDb())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()
