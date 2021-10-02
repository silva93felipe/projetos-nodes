import {Request, Response} from 'express';
import { CreateLivroService } from '../services/CreateLivroService';

class CreateLivroController{
    // Por ser uma classe que não está instanciando diretamente no express temos que tipa-las com 
    // Request e Reponse
    async handle(req: Request, res: Response){
        // 
        const { name, image, favorite } = req.body;
        // console.log(image);
        
        const createLivroService = new CreateLivroService();
        // 
        const livro = await createLivroService.execute({name, image, favorite});

        return res.json(livro);
    }
}

export { CreateLivroController }