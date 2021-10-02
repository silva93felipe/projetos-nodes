const express = require('express');
const routes = express.Router();


routes.get('/cadastro',  (req, res)=>{
    res.send('Sou a página de cadastro');
});

module.exports = routes;