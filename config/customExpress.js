const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
    // Criação do Servidor
    const app = new express()

    // Configuração de Body Parser para JSON
    app.use(bodyParser.json())
    // Configuração de Body Parser para x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }))

    // Configuração das rotas dentro da pasta Controllers
    consign()
        .include('controllers')
        .into(app)

    // retorna servidor customizado
    return app

}