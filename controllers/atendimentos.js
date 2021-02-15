const Atendimento = require('../models/atendimentos')

/* Export da rota GET */
module.exports = app => {

    // GET
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(resultados => res.json(resultados))
            .catch(error => {
                console.log(error)
                res.status(500).json(error)
            });
    })

    // GET por ID
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(res, id);
    })

    // PATCH
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })

    // POST
    app.post('/atendimentos', (req, res) => {
        const atendimentoRequestBody = req.body
        Atendimento.adiciona(atendimentoRequestBody)
            .then(atendimentoCadastrado => res.status(201).json(atendimentoCadastrado))
            .catch(error => {
                console.log(error)
                res.status(400).json(error)
            });
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}