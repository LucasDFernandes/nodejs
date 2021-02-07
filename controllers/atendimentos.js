const Atendimento = require('../models/atendimentos')

/* Export da rota GET */
module.exports = app => {
    
    // GET
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res);
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
        Atendimento.adiciona(atendimentoRequestBody, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}