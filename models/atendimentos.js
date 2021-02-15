const conexao = require('../infraestrutura/database/conexao');
const moment = require('moment');
const { default: axios } = require('axios');
const repository = require('../repositories/atendimentoRepository');

class atendimento {

    constructor() {

        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = (tamanho) => tamanho >= 5
        this.valida = (parametros) => this.validacoes.filter(campo => {
            const { nome } = campo;
            const parametro = parametros[nome];

            return !campo.valido(parametro);
        })

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'Nome do cliente deve ter mais de 5 caracteres'
            }
        ]

    }

    adiciona(atendimento) {
        const dataCriacao = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length }
        }
        const errors = this.valida(parametros);

        // valida se ha erros no request 
        if (errors.length) {
            return new Promise((resolve, reject) => reject(errors));
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            return repository.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId;
                    return { ...atendimento, id }
                });
        }

    }

    lista() {
        return repository.lista();
    }

    buscaPorId(res, id) {
        const sql = `SELECT * FROM Atendimentos where id = ${id}`;

        conexao.query(sql, async (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro);
            } else {
                const atendimento = resultados[0];
                const cpf = atendimento.cliente;

                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data

                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }

}

module.exports = new atendimento