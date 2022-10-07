/*
 0 Obter um usuario
 1 Obter o numero de telefone de um usuario a partir do seu Id
 2 Obter o endereco do usuario pelo id
*/

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '222222222',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(error, usuario) {
    if(error) {
        console.error("DEU RUIM em USUARIO", error)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1) {
            console.error("DEU RUIM em TELEFONE", error)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2) {
                console.error("DEU RUIM em ENDEREÇO", error)
                return;
            }

            console.log(`
                nome: ${usuario.nome}
                endereço: ${endereco.rua}, ${endereco.numero}
                telefone: (${telefone.ddd}) ${telefone.telefone} 
            `)
        })
    })
})
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)