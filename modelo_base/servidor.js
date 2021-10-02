require('dotenv').config();

const express =  require ('express');
const app = express();
const routes = require ('./routes');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose');
const csrf = require('csurf')
const {checkCsrfError} = require('./src/middlewares/middleware');



mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('Conectei ao banco');
    app.emit('pronto');
});


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(helmet());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(checkCsrfError);
app.use(routes);

app.on('pronto', () =>{
    app.listen(3000, ()=> {
        console.log('Servidor ativo http://localhost:3000')
    })
})
