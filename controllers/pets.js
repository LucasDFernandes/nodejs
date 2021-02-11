const Pet = require('../models/pets')

module.exports = app => {
    app.post('/pets', (req, res) => {
        const pet = req.body

        Pet.adiciona(pet, res)
    })
}