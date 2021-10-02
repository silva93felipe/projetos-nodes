const Sequelize = require("sequelize");
const db = require("./db");

const Lancamento = db.define("lancamentos", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor:{
        type: Sequelize.DOUBLE
    },
    // Tipo 1: Pagamento / 2: Recebimento 
    tipo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    // Tipo 1: Pago / 2: Pendente
    situacao: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    dataPagamento: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

// Cria tabela se não existir
Lancamento.sync();

// Se tiver a tabela cria e atualiza quando houver mudança
// Lancamento.sync({alter: true});


module.exports = Lancamento;