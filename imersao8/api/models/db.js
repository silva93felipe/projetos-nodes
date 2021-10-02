const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('imersao8', 'root', 'Sf281093',{
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then(()=>{
    console.log('Conexão com o banco de dados ativa.')
})
.catch((err) =>{
    console.log('Erro ao se conectar ao banco de dados.');
});

module.exports = sequelize;
