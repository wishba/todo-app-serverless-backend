import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

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
  const handleUpdateTodo = async event => {
    event.preventDefault()

    console.log(updateActivity);
  }

  console.log(updateActivity);

  return (
    <div>
      <button onClick={() => netlifyIdentity.open()}>Login / Register</button>
      <button onClick={() => netlifyIdentity.logout()}>Logout</button>

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

            <button>Delete</button>

            <form
              action=""
              onSubmit={handleUpdateTodo}
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
                />
              </label>
              <input
                type="submit"
                value="Edit"
              />
            </form>

            <button>cancel</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App