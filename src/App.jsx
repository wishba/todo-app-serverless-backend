import './App.css'
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  const [userId, setUserId] = useState()
  const [userName, setUserName] = useState()
  const [allTodo, setAllTodo] = useState()
  const [isLoadingTodo, setIsLoadingTodo] = useState(false)
  const [todoField, setTodoField] = useState()

  const fetchTodo = async () => {
    setIsLoadingTodo(true)

    try {
      const response = await fetch('/.netlify/functions/todosRead', {
        method: 'POST',
        body: JSON.stringify({
          userId: netlifyIdentity.currentUser().id
        })
      })

      const data = await response.json()
      console.log(data);
      setAllTodo(data.data)

    } catch (error) {
      console.error(error);

    } finally {
      setIsLoadingTodo(false)
    }
  }

  useEffect(() => {
    if (netlifyIdentity.currentUser() != null) {
      setUserId(netlifyIdentity.currentUser().id);
      setUserName(netlifyIdentity.currentUser().user_metadata.full_name)
      fetchTodo()
    }

    netlifyIdentity.on('login', user => {
      setUserId(netlifyIdentity.currentUser().id);
      setUserName(user.user_metadata.full_name)
      fetchTodo()
      netlifyIdentity.close()
    })

    netlifyIdentity.on('logout', () => {
      setUserId(null)
      setUserName(null)
      setAllTodo(null)
      netlifyIdentity.close()
    })
  }, [])

  const handleCreate = async e => {
    e.preventDefault()

    try {
      const response = await fetch('.netlify/functions/todosCreate', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          todo: todoField
        })
      })

      fetchTodo()

    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = todo => {
    console.log('update id: ' + todo.ref['@ref'].id);
    console.log(todo);
  }

  const handleDelete = todo => {
    console.log('delete id: ' + todo.ref['@ref'].id);
    console.log(todo);
  }

  return (
    <div>
      <button onClick={() => netlifyIdentity.open()}>
        {userName ? 'Logout' : 'Login / Signup'}
      </button>

      <h1>Hello{userName ? ` ${userName}!` : '!'}</h1>

      <form onSubmit={e => handleCreate(e)}>
        <input type="text"
          onChange={e => setTodoField(e.target.value)}
        />
        <input type="submit" value="create" />
      </form>

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
                    <p>Todo: {todo.data.todo}</p>
                    <p>Finished: {JSON.stringify(todo.data.finished)}</p>
                    <button onClick={() => handleUpdate(todo)}>Update</button>
                    <button onClick={() => handleDelete(todo)}>Delete</button>
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
