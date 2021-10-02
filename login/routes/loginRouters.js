const express = require('express');
const routes = express.Router();
const loginController = require('../controllers/loginController');


routes.get('/login',  (req, res)=>{
    res.render('login');
});

routes.post('/login', loginController.acessar);


routes.get('/logout', loginController.sair);


module.exports = routes;