
import { useState } from 'react';
import './App.css';
import { useFetch } from './hooks/useFetch';

const url = 'http://localhost:3000/allTasks';

function App() {
  
const {data : tasks, httpConfig} = useFetch(url);


const [newTask, setNewTask] = useState('');
const [time, setTime] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault()

   const addNewTask = {
      task: newTask,
      time : time
    }

    httpConfig(addNewTask, 'POST');

    setNewTask('');
    setTime('');

};

 const handleRemove = (id) => {
  httpConfig(id, 'DELETE');
 };

  return (
    
    <div className="App">
      
       <div className="container">
       <h1>To-Do List</h1>
       <div className="taskBox">
        {tasks && tasks.map((task) =>
         (<div className='task' key={task.id}>
           {task.task} - {task.time}
           <button onClick={() => handleRemove(task.id)}> Delete </button>
          </div> ))}
          </div>
        </div>
          
      <form onSubmit={handleSubmit}>
        <label>
          Task:
        <input 
        type='text' 
        placeholder='Task' 
        name='newTask'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}>
        </input>

        </label>

        <label>
          Time:
        <input 
        type='text' 
        placeholder='Time' 
        name='time'
        value={time}
        onChange={(e) => setTime(e.target.value)}>
        </input>

        </label>

        <input className='submit' type='submit' value='Add Task'></input>
      </form>
      
    </div>
  );
}

export default App;
