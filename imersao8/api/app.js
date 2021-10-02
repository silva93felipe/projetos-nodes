require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bycript = require('bcryptjs');
const cors = require('cors');
const { eAdmin }  = require('./middlewares/auth');
const Usuario = require('./models/Usuario');

app.use(express.json());
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
    app.use(cors());
    next();
});

app.get('/usuarios', eAdmin, async (req, res) =>{
    await Usuario.findAll({order: [['id', 'DESC']]}).then((usuarios)=>{
        return res.json({
            erro: false,
            usuarios
        });
    }).catch(()=>{
        return res.json({
            erro: true,
            message: 'Nenhum usuário cadastrado.'
        });
    })
});

app.get('/usuario/:id', eAdmin, async (req, res) =>{
    await Usuario.findByPk(req.params.id).then((usuario)=>{
        return res.json({
            erro: false,
            usuario
        });
    }).catch(()=>{
        return res.json({
            erro: true,
            message: 'Usuário não cadastrado.'
        });
    })
});

app.put('/usuario', eAdmin, async(req, res) =>{
    var dados = req.body;
    dados.senha = await bycript.hash(dados.senha, 8);

    await Usuario.update(dados, {where: {id: dados.id}})
    .then(() =>{
        return res.json({
            erro: false,
            message: 'Usuário editado com sucesso!'
        });
    }).catch(()=>{
        return res.json({
            erro: true,
            message: 'Erro ao editar usuário.'
        });
    })
})

app.post('/usuarios', async(req, res) => {
    var dados = req.body;
    dados.senha = await bycript.hash(dados.senha, 8);

    await Usuario.create(dados)
    .then(() =>{
        return res.json({
            erro: false,
            message: 'Usuário salvo com sucesso.'
        });
    }).catch(() =>{
        return res.json({
            erro: true,
            message: 'Erro ao salvar o usuário.'
        });
    });
});

app.delete('/usuario/:id', eAdmin, async(req, res) => {

    await Usuario.destroy({where: {id: req.params.id}})
    .then(() =>{
        return res.json({
            erro: false,
            message: 'Usuário apagado com sucesso.'
        });
    }).catch(() =>{
        return res.json({
            erro: true,
            message: 'Erro ao apagar usuário.'
        });
    });
});

app.post('/login',  async (req, res) =>{

    const usuario = await Usuario.findOne({where: {email: req.body.usuario}});
    if(usuario === null){
        return res.json({
            erro: true,
            message: 'Usuário não encontrado.'
        });
    }

    if(!(await bycript.compare(req.body.senha, usuario.senha))){
        return res.json({
            erro: true,
            message: 'Usuário ou senha incorreta.'
        });
    }

    var token = jwt.sign({id: usuario.id}, process.env.SECRET, {
        expiresIn: '7d'
    });

    return res.json({
        erro: false,
        message: 'Login efetuado com sucesso.',
        token
    });
});


app.listen(8080, ()=>{
    console.log('Servidor ativo em http://localhost:8080')
});

