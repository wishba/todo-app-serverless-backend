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

      <ul>
        {allTodo.map(todo => (
          <li key={todo._id}>
            <p>{todo.activity}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App