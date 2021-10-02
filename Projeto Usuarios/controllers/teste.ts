class Pessoa{
    _nome: string;
    _sobrenome: string;
    _idade: number;


    get nome(): string{
        return this._nome;
    }

    set nome(nome:string){
        this._nome = nome;
    }

    get sobrenome(): string{
        return this._sobrenome;
    }

    set sobrenome(sobrenome:string){
        this._sobrenome = sobrenome;
    }

    get idade(): number{
        return this._idade;
    }

    set idade(idade:number){
        this._idade = idade;
    }

    imprimirInfomacoes(){
        console.log(this._nome, this._sobrenome, this._idade)
    }
}

