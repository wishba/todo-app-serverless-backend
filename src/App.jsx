import './App.css'
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState()
  const [allTodo, setAllTodo] = useState()
  const [isLoadingTodo, setIsLoadingTodo] = useState(false)

  const fetchTodo = async (userId) => {
    setIsLoadingTodo(true)

    try {
      const response = await fetch('/.netlify/functions/todosRead', {
        method: 'POST',
        body: JSON.stringify({
          userId
        })
      })

      const data = await response.json()
      setAllTodo(data.data)

    } catch (error) {
      console.error(error);

    } finally {
      setIsLoadingTodo(false)
    }
  }

  useEffect(() => {
    if (netlifyIdentity.currentUser() != null) {
      setUserName(netlifyIdentity.currentUser().user_metadata.full_name)
      fetchTodo(netlifyIdentity.currentUser().id)
    }

    netlifyIdentity.on('login', user => {
      setUserName(user.user_metadata.full_name)
      fetchTodo(netlifyIdentity.currentUser().id)
      netlifyIdentity.close()
    })

    netlifyIdentity.on('logout', () => {
      setUserName('')
      setAllTodo(null)
      netlifyIdentity.close()
    })
  }, [])

  return (
    <div>
      <button onClick={() => netlifyIdentity.open()}>
        {userName ? 'Logout' : 'Login / Signup'}
      </button>

      <h1>Hello{userName ? ` ${userName}!` : '!'}</h1>

      {
        isLoadingTodo ?
          (
            <p>Loading...</p>
          ) :
          (
            <ul>
              {
                allTodo?.map(todo => (
                  <li key={todo.ref['@ref'].id}>
                    <p>id: {todo.ref['@ref'].id}</p>
                    <p>todo: {todo.data.todo}</p>
                    <p>finished: {JSON.stringify(todo.data.finished)}</p>
                  </li>
                ))
              }
            </ul>
          )
      }
    </div>
  )
}

export default App
