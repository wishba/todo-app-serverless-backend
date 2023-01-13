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
      <header className='header'>
        <h1>Todo</h1>
        {netlifyIdentity.currentUser() === null ? (
          <button onClick={() => netlifyIdentity.open()}>Login / Register</button>
        ) : (
          <button onClick={() => netlifyIdentity.logout()}>Logout</button>
        )}
      </header>

      {netlifyIdentity.currentUser() === null ? (
        <section className='section section--no-login'>
          <img src={logo} className="section__logo" alt="logo" />
          <h2>Login to see your todo</h2>
        </section>

      ) : (
        <section className='section'>
          <form
            action=""
            onSubmit={handleCreateTodo}
          >
            <label htmlFor="">
              <span className='form__activity'> Activity :</span>
              <input
                className='form__input'
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
                <p className='list__p'>
                  {todo.completed ? ('Complete') : ('Uncompleted')}
                  <span className='list__dash'>-</span>
                  {todo.activity}
                </p>

                <button
                  id={`edit-${todo._id}`}
                  className='list__edit'
                  onClick={() => {
                    document.getElementById(`cancel-${todo._id}`).classList.add('list__cancel--visible')
                    document.getElementById(`edit-${todo._id}`).classList.add('list__edit--invisible')
                    document.getElementById(`form-${todo._id}`).classList.add('list__form--visible')
                    document.getElementById(`delete-${todo._id}`).classList.add('list__delete--invisible')
                    document.getElementById(`activity-${todo._id}`).value = todo.activity
                    document.getElementById(`check-${todo._id}`).checked = todo.completed
                  }}
                >Update</button>

                <button
                  id={`delete-${todo._id}`}
                  className='list__delete'
                  onClick={() => handleDeleteTodo(todo)}
                >Delete</button>

                <form
                  id={`form-${todo._id}`}
                  className='list__form'
                  action=""
                  onSubmit={event => handleUpdateTodo({ event, todo })}
                >
                  <label htmlFor="">
                    <span className='form__activity'>Activity :</span>
                    <input
                      id={`activity-${todo._id}`}
                      className='form__input'
                      type="text"
                      name=""
                    />
                  </label>
                  <label htmlFor="">
                    Complete :
                    <input
                      id={`check-${todo._id}`}
                      className='list__checkbox'
                      type="checkbox"
                      name=""
                    />
                  </label>
                  <input
                    className='list__save'
                    type="submit"
                    value="Save"
                    onClick={() => {
                      document.getElementById(`form-${todo._id}`).classList.remove('list__form--visible')
                      document.getElementById(`edit-${todo._id}`).classList.remove('list__edit--invisible')
                      console.log(document.getElementById(`check-${todo._id}`).checked)
                      setUpdateActivity(document.getElementById(`activity-${todo._id}`).value)
                      setUpdateCompleted(document.getElementById(`check-${todo._id}`).checked)
                    }}
                  />
                </form>

                <button
                  id={`cancel-${todo._id}`}
                  className='list__cancel'
                  onClick={() => {
                    document.getElementById(`edit-${todo._id}`).classList.remove('list__edit--invisible')
                    document.getElementById(`cancel-${todo._id}`).classList.remove('list__cancel--visible')
                    document.getElementById(`form-${todo._id}`).classList.remove('list__form--visible')
                    document.getElementById(`delete-${todo._id}`).classList.remove('list__delete--invisible')
                  }}
                >Cancel</button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className='footer'>
        <p className='footer__p'>
          <span className='footer__by'>Todo app made by</span>
          <a
            className="footer__link"
            href="https://linktr.ee/wishba"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wisnu Bayu
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App