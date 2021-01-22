const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/Tabelas')

/**
 * Caso a conexão com a base de dados tenha algum erro, o servidor não irá subir
 */
conexao.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log('conectado com sucesso')
        Tabelas.init(conexao)

        // Cria o servidor customoizado
        const app = customExpress()
        // Starta servidor
        app.listen(3000, () => { })
    }
})
