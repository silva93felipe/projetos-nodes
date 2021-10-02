import { getCustomRepository } from "typeorm";
import { LivrosRepositories } from "../repositories/LivrosRepositories";

interface ILivroRequest {
    name: string;
    image ?: string;
    favorite ?: boolean;
}


class CreateLivroService {
    //
    async execute({ name, image, favorite }: ILivroRequest) {
        const livroRepository = getCustomRepository(LivrosRepositories);

        if (!name) {
            throw new Error("Name is incorrect.");
        }

        const livroAlreadyExists = await livroRepository.findOne({ name });

        if (livroAlreadyExists) {
            throw new Error("Livro already exists.");
        }
        
        const livro = livroRepository.create({
            name,
            image,
            favorite,
        });

        await livroRepository.save(livro);

        return livro;
    }
}

export { CreateLivroService };
