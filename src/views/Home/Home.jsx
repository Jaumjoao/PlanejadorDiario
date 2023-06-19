import React from 'react'
import { useState } from 'react'
import './index.scss';

function Home() {
  const[tasks, setTasks] = useState([
    { 'id': 1, 'title': 'Limpar a casa', 'status': false, 'edit': './src/assets/laps.png', 'delet': './src/assets/lixeira.png'},
    { 'id': 2, 'title': 'Responder e-mails', 'status': true, 'edit': './src/assets/laps.png', 'delet': './src/assets/lixeira.png'},
    { 'id': 3, 'title': 'Ir para academia', 'status': false, 'edit': './src/assets/laps.png', 'delet': './src/assets/lixeira.png' },
  ]);


  const adicionarInput = () =>{
    const add = document.getElementsByClassName('add')[0];
    const table = document.getElementsByTagName('table')[0];
    const title = window.document.getElementsByClassName('title')[0];
    
    add.style.display = 'flex';
    table.style.display = 'none';
    title.style.top = '-223px';
  }

  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);

  const inputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () =>{
    const add = document.getElementsByClassName('add')[0];
    const table = document.getElementsByTagName('table')[0];
    const title = document.getElementsByClassName('title')[0];
  
    if(newTask.trim() === ''){
      alert('Insira a tarefa');
      return;
    } 
    const newTaskObj = {id: Date.now(), title: newTask, edit : './src/assets/laps.png', delet: './src/assets/lixeira.png'};
    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    add.style.display = 'none';
    table.style.display = 'table';
    title.style.top = '-100px';
  }

  const taskEdit = (id) =>{
    const table = document.getElementsByTagName('table')[0];
    const editar = window.document.getElementsByClassName('editar')[0];
    const title = window.document.getElementsByClassName('title')[0];
    
    editar.style.display = 'flex';
    table.style.display = 'none';
    title.style.top = '-223px';

    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;
    setEditTask(taskToEdit);
    setNewTask(taskToEdit.title);
  }

  const atualizarTask = () =>{
    if(!editTask) return;
    const updateTask = tasks.map((task) =>
      task.id === editTask.id ? {...task, title: newTask} : task
    );
    setTasks(updateTask);
    setNewTask('');
    setEditTask(null);
    closeModal();
  }

  const [taskToDelete, setTaskToDelete] = useState(null);

  const deletTask = (id) => {
    const table = document.getElementsByTagName('table')[0];
    const del = window.document.getElementsByClassName('del')[0];
    const title = window.document.getElementsByClassName('title')[0];
  
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete) {
      setTaskToDelete(taskToDelete);
    }
  
    del.style.display = 'flex';
    table.style.display = 'none';
    title.style.top = '-223px';
  }

  const deleteTask = () => {
    if (!taskToDelete) return;

    const updatedTasks = tasks.filter((task) => task.id !== taskToDelete.id);
    setTasks(updatedTasks);
    closeModal();
  }
  

  const closeModal = () => {
    const table = document.getElementsByTagName('table')[0];
    const editar = document.getElementsByClassName('editar')[0];
    const title = document.getElementsByClassName('title')[0];
    const add = document.getElementsByClassName('add')[0];
    const del = document.getElementsByClassName('del')[0];
  
    setTaskToDelete(null);
  
    editar.style.display = 'none';
    add.style.display = 'none';
    del.style.display = 'none';
    table.style.display = 'table';
    title.style.top = '-100px';
  }
  



  return (
    <div className="home">
      <div className="home__header">
        <ul>
          <li>Organização</li>
          <li id='selected'>Tarefas</li>
        </ul>
      </div>
      <div className="home__content">


      <div className="add">
        <h1>Insira a tarefa!</h1>
        <input type="text" placeholder='Adicionar tarefa' className='input-editar' value={newTask} onChange={inputChange}/>
        <div className="btn">
        <button className='nao' onClick={closeModal}>Fechar</button>
        <button className='sim' onClick={addTask}>Adicionar</button>
        </div>
    </div>

      <div className="editar">
        <h1>Deseja editar esse item?</h1>
        <input type="text" placeholder='Editar tarefa' className='input-editar' value={newTask} onChange={inputChange}/>
        <div className="btn">
        <button className='nao' onClick={closeModal}>Não</button>
        <button className='sim' onClick={atualizarTask}>Sim</button>
        </div>
    </div>


    <div className="del">
        <h1>Deseja deletar o item?</h1>
        <input type="text" disabled placeholder='Editar tarefa' className='input-editar' value={taskToDelete?.title} onChange={inputChange}/>
        <div className="btn">
        <button className='nao' onClick={closeModal}>Não</button>
        <button className='sim' onClick={deleteTask}>Sim</button>
        </div>
    </div>



        <h1 className='title'>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
        <table style={{ borderSpacing: '0 30px' }}>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Status</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
          {tasks.map((item, index) => (
              <tr key={item.id}>
                <td style={index === 0 ? { paddingTop: '30px' } : {}}>{item.title}</td>
                <td style={index === 0 ? { paddingTop: '30px' } : {}}><input type="checkbox"  defaultChecked={item.status} /></td>
                <td style={index === 0 ? { paddingTop: '30px' } : {}}>
                  <img src={item.edit} onClick={() => taskEdit(item.id)}/> 
                  <img src={item.delet} onClick={() => deletTask(item.id)}/>
                </td>
              </tr>
            ))}
            <tr>
              <td>Nova tarefa...</td>
              <td></td>
              <td onClick={adicionarInput}><span>+</span></td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Home