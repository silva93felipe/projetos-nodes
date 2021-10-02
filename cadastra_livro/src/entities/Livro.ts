import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from 'uuid';

@Entity("livros")
class Livro {

    @PrimaryColumn()
    readonly id:string;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    favorite: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Livro };