const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg'];
    const tipo = path.extname(caminho);
    const istipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if (istipoValido) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho));
    } else {
        const error = "Tipo é inválido";
        console.log('Erro! Tipo inválido');
        callbackImagemCriada(error)
    }
}