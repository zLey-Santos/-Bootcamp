import React, { useState, useEffect } from "react";
import TaskButton from "./components/TaskButton";
import TaskTextarea from "./components/TaskTextarea";
import TaskCard from "./components/taskCard";

interface Task {
  _id: string;
  title: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    fetchTasksFromServer();
  }, []);

  const fetchTasksFromServer = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao carregar tarefas do servidor", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: newTask })
        });

        const newTaskFromServer: Task = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTaskFromServer]);
        setNewTask("");
      } catch (error) {
        console.error("Erro ao adicionar tarefa", error);
      }
    }
  };

  const saveEdit = async (taskId: string) => {
    setEditingTaskId(null);

    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: tasks.find((task) => task._id === taskId)?.title })
      });

      const updatedTask: Task = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, title: updatedTask.title } : task))
      );
    } catch (error) {
      console.error("Erro ao salvar edição da tarefa", error);
    }
  };

  const removeTask = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE"
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa", error);
    }
  };

  const toggleEdit = (taskId: string) => {
    setEditingTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  const handleEditChange = (taskId: string, value: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === taskId ? { ...task, title: value } : task)));
  };

  return (
    <TaskCard className="container mx-auto mt-8 p-2">
      <h1 className="text-3xl font-bold mb-4">Task List</h1>
      <div className="flex mb-4 ">
        <TaskTextarea value={newTask} onChange={setNewTask} />
        <button
          onClick={addTask}
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold hover:text-black border-2s border-black px-2 rounded-md uppercase">
          Add Task
        </button>
      </div>
      <TaskCard>
        <ul className="w-full px-2">
          {tasks.map((task) => (
            <li key={task._id} className="flex justify-between items-center border-b border-gray-300 py-2">
              {editingTaskId === task._id ? (
                <div className="flex items-center w-4/5">
                  <TaskTextarea value={task.title} onChange={(value: string) => handleEditChange(task._id, value)} />
                  <TaskButton action="save" onClick={() => saveEdit(task._id)} />
                </div>
              ) : (
                <>
                  {task.title}
                  <div className="flex">
                    <TaskButton action="edit" onClick={() => toggleEdit(task._id)} />
                    <TaskButton action="delete" onClick={() => removeTask(task._id)} />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </TaskCard>
    </TaskCard>
  );
};

export default App;
