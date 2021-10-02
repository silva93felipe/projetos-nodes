require('dotenv').config()
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
});

sequelize.authenticate()
.then(()=>{
    console.log('Conexão com o banco ativa.')
    
}).catch((err)=>{
    console.log('Falha ao conectar ao banco', err);
})

module.exports = sequelize;