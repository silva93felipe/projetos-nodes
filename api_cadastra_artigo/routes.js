const routes = require("express").Router()
const ArtigoModel = require('./src/models/ArtigoModel');
const artigoController = require("./src/controllers/artigoControllers")

// Rotas
// Listar todas as informações do banco do model em questão
routes.get("/artigos", artigoController.getAll);

// Buscar um informação em específico
routes.get('/artigos/:id', artigoController.getOne);

// Editar dados no banco
routes.put('/artigos/:id', artigoController.editar);

// Deletar informações do banco
routes.delete('/artigos/:id', artigoController.delete);

// Salvar informações do banco
routes.post('/artigos', artigoController.create);

module.exports = routes;