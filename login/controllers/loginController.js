exports.acessar = (req, res) =>{
    const credencial = {
        email: "admin@admin.com",
        password: "admin"
    }

    if(req.body.email === credencial.email && req.body.password === credencial.password){
        req.session.user = req.body.email;
        res.redirect('/home');
        // res.send('Login efetuado');
    }else{
        res.send({aviso: "Usuário ou senha inválido"});
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