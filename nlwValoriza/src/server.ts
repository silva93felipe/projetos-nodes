import 'reflect-metadata';
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from './routes';

import './database'

const app = express();
app.use(express.json());

app.use(router);

// Os middlewares tem que vir depois das rotas.
app.use((err: Error, req: Request, res: Response, next: NextFunction) =>{
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

app.listen(3000, ()=>{
    console.log("Servido ativo em: http://localhost:3000");     
})