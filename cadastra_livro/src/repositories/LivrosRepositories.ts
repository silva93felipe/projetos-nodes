import {EntityRepository, Repository} from 'typeorm';
import {Livro} from '../entities/Livro';

@EntityRepository(Livro)
class LivrosRepositories extends Repository<Livro>{

}

export {LivrosRepositories};