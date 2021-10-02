require('dotenv').config();

const express =  require ('express');
const app = express();
const routes = require ('./routes');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');
const {checkCsrfError, csrfMiddleware, middlewareGlobal} = require('./src/middlewares/middleware');


mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() =>{
    console.log('Conectei ao banco');
    app.emit('pronto');
});

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'bla',
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash())
app.use(helmet());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(middlewareGlobal);


app.use(routes);

app.on('pronto', () =>{
    app.listen(3000, ()=> {
        console.log('Servidor ativo http://localhost:3000')
    })
})
