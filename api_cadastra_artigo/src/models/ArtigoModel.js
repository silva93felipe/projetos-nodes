const mongoose = require('mongoose');

const ArtigoSchema = mongoose.Schema({
    nome:{
        type: String,
        required: true
    },

    conteudo: {
        type: String,
        required: true
    }
},
{   
    timestamps: true // Coloca os campos criado e atualizados automaticamente.
});

const ArtigoModel = mongoose.model('Artigo', ArtigoSchema);

module.exports = ArtigoModel;