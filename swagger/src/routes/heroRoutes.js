const BaseRoute = require('./base/baseRoute');
const Joi = require('joi');
class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: '/herois',
      method: 'GET',
      config: {
        tags: ['api'],
        description: 'deve listar os herois'
      },
      handler: (request, headers) => {
        return this.db.read();
      },
    };
  }
  create() {
    return {
      path: '/herois',
      method: 'POST',
      config: {
        tags: ['api'],
        description: 'deve cadastrar os herois',
        validate: {
          failAction: (request, h, err) => {
            throw err;
          },
          payload: {
            nome: Joi.string().max(100).required(),
            poder: Joi.string().max(30).required(),
          },
        },
      },
      handler: (request, headers) => {
        const payload = request.payload;
        return this.db.create(payload);
      },
    };
  }
  update() {
    return {
      path: '/herois/{id}',
      method: 'PATCH',
      config: {
        tags: ['api'],
        description: 'deve atualizar o heroi por id',
        validate: {
          failAction: (request, h, err) => {
            throw err;
          },
          payload: {
            nome: Joi.string().max(100),
            poder: Joi.string().max(30),
          },
          params: {
            id: Joi.string().required(),
          },
        },
      },
      handler: (request, headers) => {
        const payload = request.payload;
        const id = request.params.id;
        return this.db.update(id, payload);
      },
    };
  }
  delete() {
    return {
      path: '/herois/{id}',
      method: 'DELETE',
      config: {
        tags: ['api'],
        description: 'deve deletar o heroi pelo id',
        validate: {
          failAction: (request, h, err) => {
            throw err;
          },
          params: {
            id: Joi.string().required(),
          },
        },
      },
      handler: (request, headers) => {
        const id = request.params.id;
        return this.db.delete(id);
      },
    };
  }
}

module.exports = HeroRoutes;
