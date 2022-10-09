const ICrud = require('./interfaces/ICrud');

const Mongoose = require('mongoose');
const STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectando',
};

class MongoDb extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === 'Conectado') return state;
    if (state !== 'Conectando') return state;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return STATUS[this._driver.readyState];
  }

  defineModel() {
    const heroiSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true,
      },
      poder: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    });
    this._herois = Mongoose.model('herois', heroiSchema);
  }

  connect() {
    Mongoose.connect(
      'mongodb://rodrigo:123456@localhost:27017/herois',
      { useNewUrlParser: true },
      function (error) {
        if (!error) return;
        console.log('Falha na conexão', error);
      }
    );

    const connection = Mongoose.connection;
    this._driver = connection;
    connection.once('open', () => console.log('database rodando'));
    this.defineModel();
  }

  async create(item) {
    return this._herois.create(item);
  }

  async read(item, skip = 0, limit = 10) {
    return this._herois.find(item).skip(skip).limit(limit);
  }

  async update(id, item) {
    return this._herois.updateOne({ _id: id }, { $set: item });
  }

  async delete(id) {
    return this._herois.deleteOne({ _id: id });
  }
}

module.exports = MongoDb;
