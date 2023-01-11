import React, { useEffect, useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function App() {
  netlifyIdentity.init()
  const [allTodo, setAllTodo] = useState([])

  netlifyIdentity.on('login', user => {
    allTodoById(user.id)
  })
  netlifyIdentity.on('logout', () => {
    allTodoById('')
  })

  const allTodoById = async (userId) => {
    try {
      const response = await fetch('/.netlify/functions/allTodoById', {
        method: 'PUT',
        body: JSON.stringify({
          netlify_id: userId
          // netlify_id: netlifyIdentity.currentUser().id
          // netlify_id: netlifyId
        })
      })
      const data = await response.json()
      setAllTodo(data)
      // console.log(data);
    } catch (error) {
      console.error(error)
    }
  }

  // console.log(netlifyIdentity.currentUser());
  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      // console.log('there is user');
      allTodoById(netlifyIdentity.currentUser().id)
      // allTodoById('14a3b21b-1df9-4070-b35c-a03dfa183458')
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