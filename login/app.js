const express = require('express');
const app = require('./server');
const routes = require('./routes/routes');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');

// O morgan é usado para mapear o processo de requisições das routers
// Deve ser chamado antes das routers
app.use(morgan('tiny'));

// Pegar as informações do corpo
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configurando a engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Carregar arquivos estáticos
app.use('/static', express.static('public'))
app.use('/assets', express.static('public/assets'))

// Seções
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

// Chamadas das rotas
app.use(routes);
