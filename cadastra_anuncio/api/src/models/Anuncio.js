const Sequelize = require('sequelize');
const db = require('../databases/index');

const Anuncio = db.define('anuncios',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false

    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    },

});

// Só cria a tabela se não existir.
Anuncio.sync()

module.exports = Anuncio;
