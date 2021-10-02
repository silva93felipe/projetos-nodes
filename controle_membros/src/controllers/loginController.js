const Login = require('../models/LoginModel')

exports.index = (req, res)=>{
    res.render('login');
};

exports.register = async (req, res) =>{
    try{
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/register/index');
            });
        return;
        }

        req.flash('success', "Usuário cadastrado com sucesso.");
        req.session.save(function(){
            return res.redirect('/home');
        });
        
    }catch(e){
        console.log(e)
        res.render('login', {aviso: "Usuário ou senha inválido"});
    }
}

exports.acessar = async (req, res) =>{
    try{
        const login = new Login(req.body);
        await login.login();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function(){
                return res.redirect('/login');
            });
        return;
        }

        req.flash('success', "Usuário logado com sucesso.")
        req.session.user = login.user;
        req.session.save(function(){
            return res.redirect('/');
        });

    }catch(e){
        console.log(e);
        return res.render('/login', {aviso: 'Usuário ou senha inválidos'})
    }
}

exports.sair = (req, res) =>{
    req.session.destroy((err)=>{
        if(err){
            res.send('Error ao fazer logout')
        }else{
            res.render('login', {logout: "Sessão finalizada"})
        } 
    })
}