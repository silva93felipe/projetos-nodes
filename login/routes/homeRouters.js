const express = require('express');
const routes = express.Router();


routes.get('/home',  (req, res)=>{
    if(req.session.user){
        res.render('index', {user: req.session.user});
    }else{
        res.send('Usuário não autorizado.')
    }
});

module.exports = routes;