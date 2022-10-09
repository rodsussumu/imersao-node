/*
 0 Obter um usuario
 1 Obter o numero de telefone de um usuario a partir do seu Id
 2 Obter o endereco do usuario pelo id
*/

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      // return reject(new Error("DEU RUIM"))
      return resolve({
        id: 1,
        nome: 'Aladin',
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        telefone: '222222222',
        ddd: 11,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: 'dos bobos',
      numero: 0,
    });
  }, 2000);
}

const usuarioPromise = obterUsuario();
usuarioPromise
  .then(function (usuario) {
    return obterTelefone(usuario.id).then(function resolverTelefone(result) {
      return {
        usuario: {
          nome: usuario.nome,
          id: usuario.id,
        },
        telefone: result,
      };
    });
  })
  .then(function (resultado) {
    const endereco = obterEnderecoAsync(resultado.usuario.id);
    return endereco.then(function resolverEndereco(result) {
      return {
        usuario: resultado.usuario,
        telefone: resultado.telefone,
        endereco: result,
      };
    });
  })
  .then(function (resultado) {
    console.log('resultado', resultado);
    console.log(`
                nome: ${resultado.usuario.nome}
                endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
                telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone} 
            `);
  })
  .catch(function (error) {
    console.error('DEU RUIM', error);
  });

// obterUsuario(function resolverUsuario(error, usuario) {
//     if(error) {
//         console.error("DEU RUIM em USUARIO", error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error("DEU RUIM em TELEFONE", error)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error("DEU RUIM em ENDEREÇO", error)
//                 return;
//             }

//             console.log(`
//                 nome: ${usuario.nome}
//                 endereço: ${endereco.rua}, ${endereco.numero}
//                 telefone: (${telefone.ddd}) ${telefone.telefone}
//             `)
//         })
//     })
// })
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)
