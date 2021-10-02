"use strict";
exports.__esModule = true;
require("reflect-metadata");
var express_1 = require("express");
require("./database");
var routes_1 = require("./routes");
var multer_1 = require("multer");
var multer_2 = require("./config/multer");
var app = express_1["default"]();
app.use(express_1["default"].json());
app.use(routes_1.router);
app.get("/upload", multer_1["default"](multer_2.multerConfig).single("file"), function (req, res) {
    res.json("Arquivo salvo com sucesso.");
});
app.listen(8080, function () {
    console.log("Em funcionamento: http://localhost:8080");
});
