const Sequelize = require("sequelize")
const driver = new Sequelize(
    'heroes',
    'postgres',
    'docker',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifier: false,
        operatorAliases: false
    }
)

async function main() {
    await Herois.sync()
    await Herois.create({
        nome: 'Flash',
        poder: 'Velocidade'
    })
    const result = await Herois.findAll({raw: true})

    console.log(result)
}
main()