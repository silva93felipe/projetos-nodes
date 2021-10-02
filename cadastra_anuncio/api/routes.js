const router = require("express").Router();
const anunciosControllers = require("./src/controllers/anunciosControllers")

router.get('/anuncios',  anunciosControllers.getAll);

router.get('/anuncios/:id', anunciosControllers.getOnde);

router.put('/anuncios', anunciosControllers.edit);

router.put('/anuncios-img', anunciosControllers.editImg);

router.post('/anuncios', anunciosControllers.create);

router.delete('/anuncios/:id', anunciosControllers.delete);

module.exports = router;