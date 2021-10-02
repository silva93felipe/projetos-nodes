const mongoose = require('mongoose');

const connection = async () =>{
    try{
        const conn = await mongoose.connect(process.env.CONNECTIONSTRING, 
            {useNewUrlParser: true,
            useUnifiedTopology: true, 
            useFindAndModify: false
        });         
        console.log('Conectado ao banco');

    }catch(err){
        console.log('Não foi possível conectar ao banco', err);        
    }
}
module.exports = connection;