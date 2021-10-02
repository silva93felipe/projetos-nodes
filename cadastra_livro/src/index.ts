import "reflect-metadata";
import express from 'express';
import './database'
import { router } from "./routes";
import multer from "multer";
import { multerConfig } from "./config/multer";

const app = express();

app.use(express.json());

app.use(router);

app.get("/upload", multer(multerConfig).single("file"), (req, res) =>{
    res.json("Arquivo salvo com sucesso.")
});

app.listen(8080, ()=>{
    console.log("Em funcionamento: http://localhost:8080");  
});