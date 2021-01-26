const conexao = require('../infraestrutura/conexao')
const moment = require('moment')

class atendimento {

    adiciona(atendimento, res) {
        const dataCriacao = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Nome do cliente deve ter mais de 5 caracteres'
            }
        ]

        const errors = validacoes.filter(campo => !campo.valido)

        // valida se ha erros no request 
        if (errors.length) {
            res.status(400).json(errors)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }

    }

}

module.exports = new atendimento