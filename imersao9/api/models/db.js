const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("celke_financeiro", "root", "Sf281093",{
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate().then(()=>{
    console.log("Banco ativo.");
}).catch(()=>{
    console.log("Erro na conexão do banco.");
})

module.exports = sequelize; 