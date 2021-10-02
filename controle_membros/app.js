require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const connection = require('./src/database/connection');
const routes = require('./src/routes/router');
const flash = require('connect-flash');
const { middlewareGlobal } = require('./src/middlewares/middleware');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {v4: uuidv4} = require('uuid');
const PORT = process.env.PORT || 3000;


// Configuração da engine
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Configurando arquivos estáticos
app.use('/css', express.static(path.resolve(__dirname, 'src', 'public/css')));
app.use('/img', express.static(path.resolve(__dirname, 'src', 'public/img')));

// Necessário para pegar informações JSON do req.body
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

// Comunicação com o banco
connection();
// app.emit('pronto')


// Uso de seções para de usuários. É salva no banco por um tempo
const sessionOptions = session({
    secret: uuidv4(),
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions);

// Mensagens de curta duração
app.use(flash());

// Uso do middleware
app.use(middlewareGlobal);

// Uso de rotas
app.use(routes);

// Servidor
app.listen(PORT, ()=>{
    console.log(`Servidor ativo em http://localhost:${PORT}/home`)
})
// app.on('pronto', ()=>{
// })

