import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import netlifyIdentity from 'netlify-identity-widget'
import Form from './components/Form';

function App() {
  const [netlifyId, setNetlifyId] = useState('')
  const [allTodo, setAllTodo] = useState([])

  const allTodoById = async () => {
    try {
      const response = await fetch(`/.netlify/functions/allTodoById`, {
        method: 'PUT',
        body: JSON.stringify({
          netlify_id: netlifyId
        })
      })
      const todo = await response.json()
      setAllTodo(todo)

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      setNetlifyId(netlifyIdentity.currentUser().id)
    }

    // const allTodoById = () => {
    //   fetch(`/.netlify/functions/allTodoById`, {
    //     method: 'PUT',
    //     body: JSON.stringify({
    //       netlify_id: netlifyId
    //     })
    //   })
    //     .then(response => response.json())
    //     .then(data => setAllTodo(data))
    //     .catch(error => console.error(error))
    // }
    allTodoById()
  }, [netlifyId])

  const [createActivity, setCreateActivity] = useState('')
  const createTodo = async event => {
    event.preventDefault()

    try {
      await fetch('/.netlify/functions/createTodo', {
        method: 'POST',
        body: JSON.stringify({
          netlify_id: netlifyId,
          // netlify_id: "14a3b21b-1df9-4070-b35c-a03dfa183458",
          activity: createActivity
          // activity: "test send"
        })
      })

      allTodoById()
      setCreateActivity('')
    } catch (error) {
      console.error(error);
    }
  }

  const updateTodo = event => {
    event.preventDefault()
  }

  return (
    <div>
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

        <form onSubmit={createTodo} className='form' action="">
          <label className='form__label' htmlFor="">
            Activity :
            <input
              onChange={event => setCreateActivity(event.target.value)}
              value={createActivity}
              className='form__text'
              type="text"
            />
          </label>
          <input className='form__submit' type="submit" value="Todo" />
        </form>

        <ul className='list__container'>
          {allTodo.map((todo) => (
            <li className='list' key={todo._id}>
              <div className='list__flex'>
                <input className='list__check' type="checkbox" name="" id="" />
                <p className='list__activity'>{todo.completed ? ('completed') : ('uncompleted')} - {todo.activity}</p>
                <div className='list__button'>
                  <button >Edit</button>
                  <button >Cancel</button>
                </div>
              </div>

              <form onSubmit={updateTodo} className='form' action="">
                <Form />
              </form>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
