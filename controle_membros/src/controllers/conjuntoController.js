const Conjunto = require('../models/ConjuntoModel');

exports.cadastro = (req, res)=> {
    res.render('conjunto');
}

exports.lista = async (req, res) =>{
    try {
        const conjuntos = await Conjunto.buscar();
        res.render('listaConjunto', {conjuntos});
    } catch (error) {
        console.log('Houve um problema ao carregar os conjuntos.', error);
    }
}

exports.register = async (req, res) =>{
    try{
        const conjunto = new Conjunto(req.body);
        await conjunto.regiter();
        req.flash('success', 'Conjunto cadastrado com sucesso.')
        return req.session.save(()=> res.redirect('/conjunto/lista')); 
    } catch(error){
        console.log('Houve um problema ao cadastrar o conjunto', error);
    }
}

exports.delete = async (req, res) =>{
    try {
        const conjunto = await Conjunto.delete(req.params.id);
        req.flash('success', 'Conjunto deletado com sucesso.')
        return req.session.save(()=> res.redirect('/conjunto/lista'));
    } catch (error) {
        console.log('Houve um problema ao deleta o conjunto.', error);
    }
}

exports.edit = async (req, res) =>{
    try{
        const conjunto = await Conjunto.edit(req.params.id);
        res.render('editConjunto', {conjunto})
    }catch(e){
        console.log(e)
    }
}

exports.editar = async (req, res) =>{
    try{
        const conjunto = new Conjunto(req.body);
        conjunto.editar(req.params.id);
        req.flash('success', 'Conjunto editado com sucesso.')
        return req.session.save(()=> res.redirect('/conjunto/lista'));
    }catch(e){
        console.log('Houve um problema ao editar.', e);
    }
}