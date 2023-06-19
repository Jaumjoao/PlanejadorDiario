// import React from "react";

// //utilizar esse mockup como exemplo

// const db = [
//   { "id": 1, "title": "Exercicios", "description": "Ir para academia fazer exercicios", "completed": true },
//   { "id": 2, "title": "Limpar o carro", "description": "Limpar o carro inteiro, de dentro pra fora", "completed": false },
//   { "id": 3, "title": "Banho e tosa", "description": "Levar o cachorro ao pet shop", "completed": false },
//   { "id": 4, "title": "Limpar quarto", "description": "Limpar toda bagunça que está dentro do quarto", "completed": true },
//   { "id": 5, "title": "trabalhar", "description": "Chegar ao escritorio antes das 20:00", "completed": true },
//   { "id": 6, "title": "Ir ao banco", "description": "Chear ao banco antes das 10:00", "completed": false },
//   { "id": 7, "title": "Almoçar", "description": "Preparar a comida para a janta", "completed": false },
//   { "id": 8, "title": "Jogar volei", "description": "Ir a quadra para jogar volei com os amigos", "completed": true },
//   { "id": 9, "title": "Estudar programação", "description": "Entrar na plataforma dos alunos para estudar", "completed": false },
//   { "id": 10, "title": "shopping", "description": "Fazer algumas compras no shopping", "completed": true }
// ]

// function App() {
//   return (
//     <div className="App" >
//       <Router />
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tarefa 1' },
    { id: 2, title: 'Tarefa 2' },
    { id: 3, title: 'Tarefa 3' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObj = { id: Date.now(), title: newTask };
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;
    setEditTask(taskToEdit);
    setNewTask(taskToEdit.title);
  };

  const handleUpdateTask = () => {
    if (!editTask) return;
    const updatedTasks = tasks.map((task) =>
      task.id === editTask.id ? { ...task, title: newTask } : task
    );
    setTasks(updatedTasks);
    setNewTask('');
    setEditTask(null);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => handleEditTask(task.id)}>Editar</button>
            <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      {editTask ? (
        <div>
          <input type="text" value={newTask} onChange={handleInputChange} />
          <button onClick={handleUpdateTask}>Atualizar</button>
        </div>
      ) : (
        <div>
          <input type="text" value={newTask} onChange={handleInputChange} />
          <button onClick={handleAddTask}>Adicionar</button>
        </div>
      )}
    </div>
  );
}

export default App;
