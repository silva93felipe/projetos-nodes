require('dotenv').config();
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    eAdmin: async function validarToken(req, res, next) {
        const authHeader = req.headers.authorization;
        const [, token ] = authHeader.split(' ');
        if(!token){
            return res.json({
                erro: true,
                message: "Erro: Necessário realizar login.",
            });
        }
    
        try {
            const decode = await promisify(jwt.verify)(token, process.env.SECRET);
            req.userId = decode.id;
            return next();
        } catch (error) {
            return res.json({
                erro: true,
                message: "Erro: Login ou Senha inválido",
            });
        }
    }
    
}