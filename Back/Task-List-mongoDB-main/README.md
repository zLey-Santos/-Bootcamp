Configuração Inicial
Clonar o Repositório:

git clone  https://github.com/zLey-Santos/Task-List-mongoDB/tree/main

# Instalar dependências do servidor
cd task-server-list
npm install

# Instalar dependências do cliente
cd task-list
npm install
Configurar Variáveis de Ambiente:

No diretório server, crie um arquivo .env e defina a variável MONGO_URI para a URL do seu banco de dados MongoDB.
Exemplo .env:

dotenv
MONGO_URI=mongodb://localhost:27017/wesley_task_list
Executando a Aplicação
Iniciar o Servidor:

# No diretório server/
npm start
O servidor estará em execução em http://localhost:3000.

Iniciar o Cliente (Frontend):

# No diretório client/
npm start
A aplicação cliente estará disponível em http://localhost:3001.

Acessar a Aplicação:

Abra o navegador e acesse http://localhost:3001 para interagir com a aplicação Task List.
Funcionalidades da Aplicação
A aplicação Task List permite:

Visualizar Tarefas:
Todas as tarefas são exibidas inicialmente ao carregar a página.

Adicionar Tarefa:
Insira o título da nova tarefa no campo de texto e clique em "Add Task". A tarefa será adicionada ao servidor e à lista de tarefas.

Editar Tarefa:
Clique no botão "Edit" para entrar no modo de edição. Edite o texto da tarefa e clique em "Save" para salvar as alterações no servidor.

Excluir Tarefa:
Clique no botão "Delete" para excluir uma tarefa. A tarefa será removida do servidor e da lista de tarefas.

Estrutura do Código
server/:

server.ts: Configuração do servidor Express.
db.ts: Configuração da conexão com o MongoDB.
controllers/taskController.ts: Controladores de rota para operações CRUD.
models/taskModel.ts: Modelo da tarefa para o Mongoose.
services/taskService.ts: Lógica de negócios para manipulação de tarefas.
repositories/taskRepository.ts: Operações do MongoDB específicas para tarefas.
client/:

App.tsx: Componente principal da aplicação React.
components/: Componentes React reutilizáveis.
services/taskService.ts: Funções para interação com o servidor.
