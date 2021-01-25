const Atendimento = require('../models/atendimentos')

/* Export da rota GET */
module.exports = app => {
    // GET
    app.get('/atendimentos', (req, res) => {
        
    })

    // POST
    app.post('/atendimentos', (req, res) => {
        const atendimentoRequestBody = req.body
        Atendimento.adiciona(atendimentoRequestBody)
        res.send('Atendimento adicionado')
    })
}