const Cargo = require('../models/CargoModel');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');


exports.cadastro = (req, res) =>{
    res.render('cargo');
}

exports.lista = async (req, res) => {
    try{
        const cargos = await Cargo.buscar();
        res.render('listaCargo', {cargos});
    }catch(err){
        console.log('Houve um problema ao listar os cargos.', err)
    }
}

exports.edit = async (req, res) =>{
    try{
        const cargo = await Cargo.edit(req.params.id);
        res.render('editCargo', {cargo});
    }catch(err){
        console.log('Houve um problema ao listar o cargo.', err)
    }
}

exports.editar = async (req, res) =>{
    try {
        const cargo = new Cargo(req.body);
        await cargo.editar(req.params.id);
        req.flash('success', 'Cargo editado com sucesso.')
        return req.session.save(()=> res.redirect('/cargo/lista'));
    } catch (error) {
        console.log('Houve um problema a editar o cargo.', error);
    }
}

exports.delete = async (req, res) =>{
    try{
        const cargo = await Cargo.delete(req.params.id);
        req.flash('success', 'Cargo removido com sucesso.')
        return req.session.save(()=> res.redirect('/cargo/lista'));
    }catch(err){
        console.log('Houve um problema ao deletar o cargo.', err);  
    }
}

exports.regiter = async (req, res) =>{
    try {
        const cargo = new Cargo(req.body);
        await cargo.register();
        req.flash('success', 'Cadastro realizado com sucesso.')
        return req.session.save(()=> res.redirect('/cargo/lista'));

    } catch (error) {
        console.log('Erro ao cadastrar o cargo', error);
    }
}


exports.pdf =  async (req, res) => {
    
    try{
        const cargos = await Cargo.buscar();
        ejs.renderFile(path.resolve(__dirname, '../', 'views', 'includes', '_listar_cargo.ejs'), {cargos}, (err, html) =>{
            if(err){
                return res.send('Erro na leitura do arquivo');
            }
            
            const options = {
                format: 'A4',
                border: {
                    right: '8'
                }
            };

            pdf.create(html, options).toFile('cargo.pdf', (err, data) =>{
                if(err) return res.send('Erro ao gerar PDF');

                return res.redirect('/cargo/lista');
            })
        })   
    } catch(err){
        console.log('Houve um problema.', err)
    }
}
