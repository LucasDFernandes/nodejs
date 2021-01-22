class Tabelas {

    init(conexao) {
        this.conexao = conexao
        this.criaAtendimento()
    }

    criaAtendimento() {
        const sql = `CREATE TABLE IF NOT EXISTS agenda_petshop.Atendimentos (
                        id INT NOT NULL AUTO_INCREMENT,
                        cliente varchar(50) NOT NULL,
                        pet varchar(20),
                        servico varchar(20) NOT NULL,
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

}

module.exports = new Tabelas