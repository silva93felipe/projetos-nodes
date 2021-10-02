const mongoose = require('mongoose');


const ConjuntoSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    fundacao: {
        type: Date
    }
})

const ConjuntoModel = mongoose.model('Conjuntos', ConjuntoSchema);


class Conjunto{
    constructor(body){
        this.body = body;
        this.conjunto = null
    }

    async regiter(){
        this.Conjunto = await ConjuntoModel.create(this.body);
    }

    async editar(id){
        this.conjunto = await ConjuntoModel.findByIdAndUpdate(id, this.body, {new: true});
    }

    static async buscar(){
        const conjuntos = await ConjuntoModel.find();
        return conjuntos;
    }

    static async delete(id){
        const conjunto = await ConjuntoModel.findByIdAndDelete({_id: id});
        return conjunto;
    }

    static async edit(id){
        const pessoa = await ConjuntoModel.findOne({_id: id});
        return pessoa;
    }
}

module.exports = Conjunto;