const Pessoa = require('../models/PessoaModel');

exports.cadastro = (req, res) => {
    res.render('pessoa');
}

exports.edit = async (req, res) =>{
    try{
        const pessoa = await Pessoa.edit(req.params.id);
        res.render('editPessoa', {pessoa});
    }catch(err){
        console.log('Erro ao editar pessoa.', err);
    }
}

exports.editar = async (req, res) =>{
    try{
        const pessoa = new Pessoa(req.body);
        await pessoa.editar(req.params.id)
        req.flash('success', 'Pessoa editada com sucesso.')
        return req.session.save(()=> res.redirect('/pessoa/lista'));
    }catch(err){
        console.log('Houve um problema ao editar.', err);
    }
}

exports.lista = async (req, res) => {
    try{
        const pessoas = await Pessoa.buscar()
        res.render('listaPessoa', { pessoas});
    }catch(error){
        console.log('Houve um problema ao listar as pessoas.', error);
    }
}

exports.register = async (req, res) => {
    try {
        const pessoa = new Pessoa(req.body);
        await pessoa.register();
        req.flash('success', 'Pessoa cadastrada com sucesso.')
        return req.session.save(()=> res.redirect('/pessoa/lista'));  

    } catch (error) {
        console.log(error)
    }
}

exports.delete = async (req, res) => {
    try{
        const pessoa = await Pessoa.delete(req.params.id);
        req.flash('success', 'Pessoa deletada com sucesso.')
        return req.session.save(()=> res.redirect('/pessoa/lista')); 
    }catch(error){
        console.log('Houve um problema ao deletar a pessoa.', error);
    }
}