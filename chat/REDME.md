Para usar o typescript no node:
- npm i @types/express --save-D
- npm i typescript -D
- tsc --init
- npm i ts-node-dev -D

Para usar o banco no node:
- baixar o typeorm + sqlite: npm i typeorm reflect-metadata sqlite3
- Criar um arquivo na raiz com o nome ormconfig.json e colocar { "type": "sqlite"}
- criar pasta database > outra pasta com o nome migrations e um arquivo.ts onde vai fazer a comunicação com o banco

Rodar migration:
- npm run typeorm migration:create -- -n CreateSettings(essa é nome da tabela);
- depois para rodar as migration npm run typeorm migration:run
- descomentar no tsconfig.json "experimentalDecorators": true, "emitDecoratorMetadata": true para poder usar o decorations
- para usar o uuid (npm i uuid --save, npm i @types/uuid -D)