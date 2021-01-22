const customExpress = require('./config/customExpress')

// Cria o servidor customoizado
const app = customExpress()
// Starta servidor
app.listen(3000, () => console.log('servidor rodando!'))
