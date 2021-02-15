class Tabelas {

    init(conexao) {
        this.conexao = conexao
        this.criaAtendimento()
        this.criarPet()
    }

    criaAtendimento() {
        const sql = `CREATE TABLE IF NOT EXISTS agenda_petshop.Atendimentos (
                        id INT NOT NULL AUTO_INCREMENT,
                        cliente varchar(11) NOT NULL,
                        pet varchar(20),
                        servico varchar(20) NOT NULL,
                        data DATETIME NOT NULL,
                        dataCriacao DATETIME NOT NULL,
                        status varchar(10) NOT NULL,
                        observacoes text,
                        PRIMARY KEY (id)
                    )`

        this.conexao.query(sql, error => {
            if (error) {
                console.log('erro ao criar tabela')
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }

    criarPet() {
        const query = `CREATE TABLE IF NOT EXISTS Pets(
                        id INT NOT NULL AUTO_INCREMENT, 
                        nome varchar(50), 
                        imagem varchar(200), 
                        PRIMARY KEY (id)
                    )`

        this.conexao.query(query, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Pets foi criada com sucesso')
            }
        })
    }

}

module.exports = new Tabelas