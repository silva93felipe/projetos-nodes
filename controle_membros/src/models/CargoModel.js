const mongoose = require('mongoose');

const CargoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
});

const CargoModel = mongoose.model('Cargos', CargoSchema);

class Cargo{
    constructor(body){
        this.body = body;
        this.cargo = null;
    }

    async register(){
        this.cargo = await CargoModel.create(this.body);
    }

    static async edit(id){
        const cargo = await CargoModel.findOne({_id: id});
        return cargo;
    }

    async editar(id){
        this.cargo = await CargoModel.findByIdAndUpdate(id, this.body, { new: true});
    }

    static async buscar(){
        const cargos = await CargoModel.find();
        return cargos;
    }

    static async delete(id){
        const cargo = await CargoModel.findByIdAndDelete({_id: id});
        return cargo;
    }
}

module.exports = Cargo;