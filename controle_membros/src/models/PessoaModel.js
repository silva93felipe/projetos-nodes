const mongoose = require('mongoose');

const PessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    },

    nascimento: {
        type: Date,
    },

    criadoEm: {
        type: Date,
        default: Date.now
    }
});

const PessoaModel = mongoose.model('Pessoa', PessoaSchema);


// Posso fazer validações aqui para assim ele poder salvar no banco

class Pessoa {
    constructor(body) {
        this.body = body;
        this.pessoa = null;
    }

    async register() {
        this.pessoa = await PessoaModel.create(this.body);
    }

    async editar(id) {
        this.pessoa = await PessoaModel.findByIdAndUpdate(id, this.body, {new: true});
    }

    static async buscar(){
        const pessoas = await PessoaModel.find();
        return pessoas;
    }

    static async delete(id){
        const pessoa = await PessoaModel.findByIdAndDelete({_id: id});
        return pessoa;
    }

    static async edit(id){
        const pessoa = await PessoaModel.findOne({_id: id});
        return pessoa;
    }
}

module.exports = Pessoa;