import logo from './logo.svg';
import './App.css';
import netlifyIdentity from 'netlify-identity-widget'
import { useEffect, useState } from 'react';

function App() {
  netlifyIdentity.init()

  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      allTodoById(netlifyIdentity.currentUser().id)
    }
  }, [])

  const [allTodo, setAllTodo] = useState([])

  netlifyIdentity.on('login', user => {
    allTodoById(user.id)
    netlifyIdentity.close()
  })
  netlifyIdentity.on('logout', () => {
    allTodoById('')
  })

  const allTodoById = async (netlifyId) => {
    try {
      const response = await fetch('/.netlify/functions/allTodoById', {
        method: 'PUT',
        body: JSON.stringify({
          netlify_id: netlifyId
        })
      })
      const data = await response.json()
      setAllTodo(data)

    } catch (error) {
      console.error(error)
    }
  }

  const [createActivity, setCreateActivity] = useState('')
  const handleCreateTodo = async event => {
    event.preventDefault()

    try {
      await fetch('/.netlify/functions/createTodo', {
        method: 'POST',
        body: JSON.stringify({
          netlify_id: netlifyIdentity.currentUser().id,
          activity: createActivity
        })
      })

      allTodoById(netlifyIdentity.currentUser().id)

    } catch (error) {
      console.error(error)
    }
  }

  const [updateActivity, setUpdateActivity] = useState('')
  const [updateCompleted, setUpdateCompleted] = useState(false)
  const handleUpdateTodo = async ({ event, todo }) => {
    event.preventDefault()

    try {
      await fetch('/.netlify/functions/updateTodo', {
        method: 'PUT',
        body: JSON.stringify({
          id: todo._id,
          netlify_id: todo.netlify_id,
          activity: updateActivity,
          completed: updateCompleted
        })
      })

      allTodoById(netlifyIdentity.currentUser().id)

    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTodo = async todo => {
    try {
      await fetch('/.netlify/functions/deleteTodo', {
        method: 'DELETE',
        body: JSON.stringify({
          id: todo._id
        })
      })

      allTodoById(netlifyIdentity.currentUser().id)

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="app">
      <header className='app__header'>
        {netlifyIdentity.currentUser() === null ? (
          <button onClick={() => netlifyIdentity.open()}>Login / Register</button>
        ) : (
          <button onClick={() => netlifyIdentity.logout()}>Logout</button>
        )}
      </header>

      {netlifyIdentity.currentUser() === null ? (
        <section>
          <img src={logo} className="app__logo" alt="logo" />
          <p>Login / register to see your todo</p>
          <p>
            made by
            <a
              className="app__link"
              href="https://linktr.ee/wishba"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wisnu Bayu
            </a>
          </p>
        </section>

      ) : (
        <section>
          <form
            action=""
            onSubmit={handleCreateTodo}
          >
            <label htmlFor="">
              Activity :
              <input
                type="text"
                name=""
                id=""
                onChange={event => setCreateActivity(event.target.value)}
              />
            </label>
            <input
              type="submit"
              value="Create Todo"
            />
          </form>

          <ul>
            {allTodo.map(todo => (
              <li key={todo._id}>
                <p>{todo.completed ? ('Complete') : ('Uncompleted')}</p>
                <p>{todo.activity}</p>

                <form
                  action=""
                  onSubmit={event => handleUpdateTodo({ event, todo })}
                >
                  <label htmlFor="">
                    Activity :
                    <input
                      type="text"
                      name=""
                      id=""
                      onChange={event => setUpdateActivity(event.target.value)}
                    />
                  </label>
                  <label htmlFor="">
                    Complete :
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={() => setUpdateCompleted(!updateCompleted)}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Edit"
                  />
                </form>

                <button>cancel</button>

                <button onClick={() => handleDeleteTodo(todo)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default App