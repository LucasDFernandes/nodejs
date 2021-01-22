const express = require('express')

const app = new express()

app.listen(3000, () => console.log('servidor rodando!'))

app.get('/atendimentos', (req, res) => res.send('você está na rota de atendimentos'))