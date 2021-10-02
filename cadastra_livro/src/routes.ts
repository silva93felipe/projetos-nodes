import {Router} from 'express';
import multer from 'multer';
import { multerConfig } from './config/multer';

import { CreateLivroController } from './controllers/CreateLivroController';

const router = Router();
const createLivroController = new CreateLivroController();


router.post("/livros", createLivroController.handle);
// multer(multerConfig).single("file"),

export {router};