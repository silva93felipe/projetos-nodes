const Contato = require('../models/ContatoModel')

exports.index = (req, res) =>{
    res.render('contato', {
        contato: {}
    });
};

exports.register = async (req, res) =>{
    try{   
        const contato = new Contato(req.body);
        await contato.register();
        
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(()=> res.redirect('index'));
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso.');
        req.session.save(()=> res.redirect(`/`));
        return;

    }catch(e){
        console.log(e)
        return res.render('erro')
    }
}

exports.editIndex = async (req, res) =>{
    if(!req.params.id) return res.render('erro');

    const contato = await Contato.buscaPorID(req.params.id);
    if(!contato) return res.render('erro');
    
    res.render('contato', { contato });
}

exports.edit = async (req, res) =>{

    try{
        if(!req.params.id) return res.render('erro');
        const contato = new Contato(req.body);
        await contato.edit(req.params.id);
    
        if(contato.errors.length > 0) {
            req.flash('errors', contato.errors);
            req.session.save(()=> res.redirect('index'));
            return;
        }
        
        // Quando se quer voltar a rota que tem a mesma rota base mas só tem uma nova variável usar o ..
        // Ex: ../index/${contato.contato._id}
        req.flash('success', 'Contato editado com sucesso.');
        req.session.save(()=> res.redirect('/'));
        return;

    }catch(e){
        console.log(e);
        res.render('erro');
    }
}

exports.delete = async (req, res) =>{
    if(!req.params.id) return res.render('erro');

    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render('erro');
    
    req.flash('success', 'Contato apagado com sucesso.');
    req.session.save(()=> res.redirect('/'));
    return;

}
