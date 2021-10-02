const express = require('express');
const cors = require('cors');
const app = express();

const fs = require('fs'); //trabalha com arquivos
const path = require('path') //Trabalha com caminhos absolutos de arquivos.

const router = require("./routes")

require('./src/databases/index')

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization');
    app.use(cors());
    next();
});

app.use(router)

app.listen(8080, ()=>{
    console.log('Servidor ativo em http://localhost:8080');
});
