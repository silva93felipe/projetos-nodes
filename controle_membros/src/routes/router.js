const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const cargoController = require('../controllers/cargoController');
const conjuntoController = require('../controllers/conjuntoController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

const { loginRequired } = require('../middlewares/middleware');

// Rotas da home
router.get('/home', (req, res)=>{
    res.render('homePage');
})

// Rota de login
router.get('/login',  loginController.index);
router.get('/logout', loginController.sair);

// Rotas do registro
router.get('/register/index', registerController.index);
router.post('/register/register', loginController.register);

// Rotas da menu
router.post('/', loginController.acessar);
router.get('/', loginRequired, (req, res)=>{
    res.render('menu')
})

// Rotas de pessoas
router.get('/pessoa/index', loginRequired, pessoaController.cadastro);
router.post('/pessoa/register', loginRequired, pessoaController.register);
router.get('/pessoa/lista', loginRequired, pessoaController.lista);
router.get('/cadastro/delete/:id', loginRequired, pessoaController.delete);
router.get('/cadastro/edit/:id', loginRequired, pessoaController.edit);
router.post('/cadastro/editar/:id', loginRequired, pessoaController.editar);

// Rotas de cargos
router.get('/cargo/index', loginRequired, cargoController.cadastro);
router.post('/cargo/register', loginRequired, cargoController.regiter);
router.get('/cargo/lista', loginRequired, cargoController.lista);
router.get('/cargo/delete/:id', loginRequired, cargoController.delete);
router.get('/cargo/edit/:id', loginRequired, cargoController.edit);
router.post('/cargo/editar/:id', loginRequired, cargoController.editar);
router.get('/cargo/cargo-pdf', cargoController.pdf);

// Rotas de conjuntos
router.get('/conjunto/index', loginRequired, conjuntoController.cadastro);
router.post('/conjunto/register', loginRequired, conjuntoController.register);
router.get('/conjunto/lista', loginRequired, conjuntoController.lista);
router.get('/conjunto/delete/:id', loginRequired, conjuntoController.delete);
router.get('/conjunto/edit/:id', loginRequired, conjuntoController.edit);
router.post('/conjunto/editar/:id', loginRequired, conjuntoController.editar);

module.exports = router;