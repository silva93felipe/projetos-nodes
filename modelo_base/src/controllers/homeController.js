const HomeModel = require('../models/HomeModel');

HomeModel.create({
    titulo: 'Outra coisa',
    descricao: 'Sobre novo teste'
})
.then(dados => console.log(dados))
.catch(e => console.log(e));

exports.paginaInicial = (req, res) => {
    res.render('index');
};