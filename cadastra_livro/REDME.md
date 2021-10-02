#Criar projeto:
    - npm ini -y (Se não quiser mudar nada);
#Pacotes a instalar:
    - npm i express --save (Gerencia rotas);
    - npm i typescript --save ();
    - npx tsc --init (Onde contém as configurações do typescript);
    - npm i ts-node-dev --save-dev(Facilita a compilação de ts para js. Criar um script, por exemplo:
                                    "dev": "ts-node-dev --inspect --ignore-watch node_modules src/server.ts",)
        - Ao usar o typescript tem que usar as tipagens das bibliotecas:
            npm i --save-dev @types/express;
    - npm i uuid --save (Gera ID aleatório)
    - npm i uuid @types/uuid -D
        
#Usar ORM para fazer comunicação entre a API e o banco
    - npm install typeorm --save
    - npm install reflect-metadata --save
    - npm install sqlite3 --save (Qual o banco)
    - Criar um script para usar a cli do typeorm(Detalhes no package.json);
    - Criar migrações:
        - npm run typeorm migration:create -- -n Livro
        - npm run typeorm migration:run (rodas as migrações para o banco)
        - npm run typeorm migration:revert (desfaz as migrações anterior)
    - Criação de entidades(Classe referente a tabela do banco)
        - npm run typeorm entity:create -- -n Livro

##Sequência das pastas
Server(entidades, banco, repositório) > controllers(recebe as informações do cliente e passa para o service fazer a regra de negócio(condições, verificações e tudo mais)) > Serviços (condições, verificações e tudo mais)