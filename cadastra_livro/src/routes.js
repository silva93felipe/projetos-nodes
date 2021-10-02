"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var CreateLivroController_1 = require("./controllers/CreateLivroController");
var router = express_1.Router();
exports.router = router;
var createLivroController = new CreateLivroController_1.CreateLivroController();
router.post("/livros", createLivroController.handle);
