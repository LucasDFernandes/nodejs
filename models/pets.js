const conexao = require('../infraestrutura/database/conexao')
const uploadDeArquivos = require('../infraestrutura/arquivos/uploadDeArquivos')

class Pet {
    adiciona(pet, res) {
        const query = 'INSERT INTO Pets SET ?'

        uploadDeArquivos(pet.imagem, pet.nome, (error, newPath) => {
            if (error) {
                res.status(400).json({ error });
            } else {
                const novoPet = { nome: pet.nome, imagem: newPath }
                conexao.query(query, novoPet, erro => {
                    if (erro) {
                        console.log(erro)
                        res.status(400).json(erro)
                    } else {
                        res.status(200).json(novoPet)
                    }
                })
            }
        })
    }
}
module.exports = new Pet()