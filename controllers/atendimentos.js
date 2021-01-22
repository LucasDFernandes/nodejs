/* Export da rota GET */
module.exports = app => {
    // GET
    app.get('/atendimentos', (req, res) => res.send('você está na rota de atendimentos'))

    // POST
    app.post('/atendimentos', (req, res) => {
        res.send('Você está na rota de atendimentos e está realizando um POST')
    })
}