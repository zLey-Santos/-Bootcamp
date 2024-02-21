// Selecionar o banco de dados
use("wesley_task_list");

// Coleção onde as tarefas serão armazenadas
const collection = "tasks";

// Inserir uma nova tarefa na coleção
db[collection].insertOne({
  title: "Minha Nova Tarefa"
  // Adicione outros campos conforme necessário
});

// Consultar todas as tarefas na coleção
const tasks = db[collection].find().toArray();
printjson(tasks);
