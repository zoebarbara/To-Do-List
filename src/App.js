import { useState } from 'react';

import './App.css';
import todoIcon from './img/todoIcon.png';
import catIcon from './img/catIcon.png';
import trashIcon from './img/trashIcon.png';
import doubleCheckIcon from './img/doubleCheckIcon.png';
import blueCheckIcon from './img/blueCheckIcon.png';
import blueTrashIcon from './img/blueTrashIcon.png';

const TODOS_DATA = [
  { id: 1, title: 'Comprar pan y motaza', status:'todo'},
  { id: 2, title: 'Vender muebles wallapop', status:'todo'},
  { id: 3, title: 'Revisar contrato', status:'done'},
  { id: 4, title: 'Entrevista con Paul', status:'done'}
]

function App() {
  const [ mode, setMode ] = useState('all');
  const [ todos, setTodos ] = useState(TODOS_DATA);
  const [ inputValue, setInputValue ] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newTodo ={
      id: new Date(),
      status: 'todo',
      title: inputValue
    };
    setTodos([...todos,newTodo]);
    setInputValue('');
  }

  const handleRemoveTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  const handleDoneTodo = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }else if (todo.id === id && todo.status === 'done'){
        return {
          ...todo,
          status:'todo'
        }
    
      } else {
        return{
          ...todo,
          status:'done'
        }
      }
    })
    setTodos(newTodos);
  }

  const todosFiltered = todos.filter(todo => mode ==='all' || todo.status === mode)

  return (
    <div className='todo'>
      <h1>TODO LIST</h1>
        <section className="todo__form">
          <form onSubmit={handleFormSubmit}>
            <img src={todoIcon} alt='todoList'/>
            <input 
              name='todo__title' 
              placeholder='¿Qué tienes que hacer?'
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              />
            <button onClick>ADD</button>
          </form>
        </section>
        
        <section className='tabs'>
          <img src={catIcon} alt='categoryIcon'/>
          <div className='tabs__wrapper'>
          <div 
            className={`tabs__item ${mode === 'todo'? 'isActive': ''}`}
            onClick ={()=> setMode('todo')}>
            TO DO
          </div>
          <div 
            className={`tabs__item ${mode === 'done'? 'isActive': ''}`}
            onClick ={()=> setMode('done')}>
              DONE
          </div>
          <div 
            className={`tabs__item ${mode === 'all'? 'isActive': ''}`}
            onClick ={()=> setMode('all')}>
              ALL
          </div>
          </div>
        </section>

        <section className='todo_list'>
          {todosFiltered.map( ({ status, title, id }) => (
            <article
              key={`${id}`}
              className={`todo_item ${status ==='done' ? 'isDone' : ''}`}>
              <button onClick={() => handleDoneTodo(id)}>
                <img src={`${status ==='done' ? doubleCheckIcon : blueCheckIcon}`} alt='icon'></img>
              </button>
              <div className='todo_item__title'>{title}</div>
              <button onClick={() => handleRemoveTodo(id)}>
                <img 
                src={`${status ==='done' ? trashIcon : blueTrashIcon}`} alt='trashIcon'/>
              </button>
            </article>
          ))}

        </section>

    </div>
  );
}

export default App;
