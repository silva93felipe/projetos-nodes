require('dotenv').config()
const express = require("express");
const app = express();
require("./src/database/index")
const routes = require('./routes')

// Permite que outros possar consumir essa API
const cors = require('cors');

// Para colocar o cors para funcionar temos que criar um middleware
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*"); //O * diz que qualquer aplicação pode fazer o consumo
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); //Quais métodos podem ser usados na API
    app.use(cors());
    next();
}) 

// Necessário para pegar informações JSON do req.body
app.use(express.json());

// Rotas do programa
app.use(routes); 

// Conexão com o bancov moongose

// Serviço do banco do back
const PORT = 8080

app.listen(PORT, () => {
    console.log("Servidor ativo em http://localhost:8080");
});
