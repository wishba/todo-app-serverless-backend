import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function App() {
  netlifyIdentity.init()
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

  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      allTodoById(netlifyIdentity.currentUser().id)
    }
  }, [])

  return (
    <div>
      <button onClick={() => netlifyIdentity.open()}>Login / Register</button>
      <button onClick={() => netlifyIdentity.logout()}>Logout</button>

      <form action="">
        <label htmlFor="">
          Activity :
          <input
            type="text"
            name=""
            id=""
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

            <form action="">
              <label htmlFor="">
                Activity :
                <input
                  type="text"
                  name=""
                  id=""
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
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App