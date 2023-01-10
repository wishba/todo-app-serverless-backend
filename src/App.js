import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import netlifyIdentity from 'netlify-identity-widget'
import Form from './components/Form';

function App() {
  const [netlifyId, setNetlifyId] = useState('')
  const [allTodo, setAllTodo] = useState([])

  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      setNetlifyId(netlifyIdentity.currentUser().id)
    }

    const allTodoById = () => {
      fetch(`/.netlify/functions/allTodoById`, {
        method: 'PUT',
        body: JSON.stringify({
          netlify_id: netlifyId
        })
      })
        .then(response => response.json())
        .then(data => setAllTodo(data))
        .catch(error => console.error(error))
    }
    allTodoById()
  }, [netlifyId])

  return (
    <>
      <header className="header">
        <h1 className='header__title'>Todo App</h1>
        <div className='header__button'>
          <button onClick={() => {
            netlifyIdentity.open()
            netlifyIdentity.on('login', user => {
              setNetlifyId(user.id)
              netlifyIdentity.close()
            })
          }}>Login / Register</button>
          <button onClick={() => {
            netlifyIdentity.logout()
            netlifyIdentity.on('logout', () => setNetlifyId(''))
          }}>Logout</button>
        </div>
      </header>

      <section>
        <div className='section__not-login'>
          <img src={logo} className="section__logo" alt="logo" />
          <p>Login to see your todo</p>
        </div>

        <Form />

        <ul>
          {allTodo.map((todo) => (
            <li key={todo._id}>
              <div className='list__flex'>
                <p>{todo.completed ? ('completed') : ('uncompleted')} - {todo.activity}</p>
                <div className='list__button'>
                  <button >Edit</button>
                  <button >Cancel</button>
                </div>
              </div>
              <Form />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
