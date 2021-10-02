const mongoose = require("mongoose");

mongoose.connect(process.env.ACCESS_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).then(() =>{
    console.log('Conexão com o banco realizada com sucesso.');
}).catch((err) =>{
    console.log('Erro ao conectar ao banco:', err);
});
