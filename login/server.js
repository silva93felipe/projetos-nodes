const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Servidor ativo na porta: http://localhost:${PORT}`)
})

module.exports = app;