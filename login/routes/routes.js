const express = require('express');
const routes = express.Router();
const homeRouters = require('./homeRouters');
const cadastroRouters = require('./cadastroRouters');
const loginRouters = require('./loginRouters');


routes.use(homeRouters, cadastroRouters, loginRouters);

// Quando não encontrar uma rota ele vai cair aqui.
routes.get((req, res, next) =>{
    res.send('Página não encontrada.');
    next();
    
})

module.exports = routes;
