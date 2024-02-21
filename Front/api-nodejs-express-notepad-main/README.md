# api-nodejs-express-notepad

Nome: Wesley Santos

Turma: Bootcamp Desenvolvedor Web Full Stack | [1T23] Noite @INFNET-BCLFST00C1-N2-L2

Link do repositório projeto no GitHub: https://github.com/zLey-Santos/api-nodejs-express-notepad

A aplicação é um serviço de notas (notepad) que permite aos usuários criar, listar, ler, atualizar e excluir notas.
As notas têm três campos principais: título, subtítulo e conteúdo.
A aplicação utiliza o framework Express.js para criar uma API RESTful que manipula as operações CRUD (Create, Read, Update, Delete) das notas.
Além disso, a aplicação faz uso do pacote Zod para validação de entrada de dados.

index.mjs
Este arquivo é o ponto de entrada da sua aplicação. Ele configura o servidor Express, lida com erros e inicia o servidor na porta especificada.

handleErrorMiddleware: Middleware para tratar erros específicos (ZodError) retornando respostas JSON apropriadas.

notepadService.mjs
Este arquivo contém funções que fornecem a lógica de negócios relacionada às notas.

listNotepads({ limit, offset }): Retorna uma lista de notas com paginação.
createNotepad(data): Cria uma nova nota.
readNotepad(id): Lê uma nota com base no ID.
updateNotepad(id, data): Atualiza uma nota com base no ID.
deleteNotepad(id): Exclui uma nota com base no ID.
notepadController.mjs
Este arquivo define as rotas da API relacionadas às notas usando o Express Router.

GET /notepads: Obtém uma lista de notas com opções de paginação.
GET /notepads/:id: Obtém uma única nota com base no ID.
POST /notepads: Cria uma nova nota.
DELETE /notepads/:id: Exclui uma nota com base no ID.
PATCH /notepads/:id: Atualiza parcialmente uma nota com base no ID.
create-notepad.schema.mjs e update-notepad.schema.mjs
Esses arquivos contêm esquemas Zod para validação de entrada de dados ao criar e atualizar notas.

jsonService.mjs
Este arquivo fornece funções para criar, ler, atualizar e excluir arquivos JSON.

createjson(path, data): Cria um arquivo JSON a partir de dados.
readjson(path): Lê um arquivo JSON e o retorna como um objeto JavaScript.
updatejson(path, partialjson): Atualiza um arquivo JSON existente com novos dados.
deletejson(path): Exclui um arquivo JSON.

A funcionalidade de "Star Rating" permite que os usuários classifiquem notas usando uma escala de estrelas. Essa classificação é exibida visualmente na forma de estrelas preenchidas. Os principais pontos incluem:

Usamos o componente "StarRatings" da biblioteca react-star-ratings para implementar essa funcionalidade.
Os usuários podem clicar nas estrelas para atribuir uma classificação à nota.
A classificação média da nota é exibida, juntamente com o número de avaliações feitas por outros usuários.
Os usuários podem atualizar a classificação clicando nas estrelas e depois no botão "Classificar".
Essa funcionalidade ajuda a destacar notas populares e permite que os usuários expressem suas opiniões de forma visual.
