import './App.css'
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  const [userId, setUserId] = useState()
  const [userName, setUserName] = useState()
  const [allTodo, setAllTodo] = useState()
  const [isLoadingTodo, setIsLoadingTodo] = useState(false)
  const [todoField, setTodoField] = useState()
  const [updateId, setUpdateId] = useState()
  const [updateTodoField, setUpdateTodoField] = useState('')
  const [updateFinishedField, setUpdateFinishedField] = useState(false)

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
      await fetch('.netlify/functions/todosCreate', {
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

  const handleUpdate = async e => {
    e.preventDefault()

    try {
      await fetch('.netlify/functions/todosUpdate', {
        method: 'PUT',
        body: JSON.stringify({
          todoId: updateId,
          todo: updateTodoField,
          finished: updateFinishedField
        })
      })

      fetchTodo()

    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdateInfo = todo => {
    setUpdateId(todo.ref['@ref'].id)
    setUpdateTodoField(todo.data.todo)
    setUpdateFinishedField(todo.data.finished)
  }

  const handleDelete = async todo => {
    try {
      await fetch('.netlify/functions/todosDelete', {
        method: 'DELETE',
        body: JSON.stringify({
          todoId: todo.ref['@ref'].id
        })
      })

      fetchTodo()

    } catch (error) {
      console.error(error);
    }
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

      <form onSubmit={e => handleUpdate(e)}>
        <input type="text"
          value={updateTodoField}
          onChange={e => setUpdateTodoField(e.target.value)}
        />
        <input type="checkbox"
          checked={updateFinishedField}
          onChange={() => setUpdateFinishedField(!updateFinishedField)}
        />
        <input type="submit" value="update" />
      </form>

      {isLoadingTodo ?
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
                  <button onClick={() => handleUpdateInfo(todo)}>Update</button>
                  <button onClick={() => handleDelete(todo)}>Delete</button>
                </li>
              )).slice().reverse()
            }
          </ul>
        )
      }
    </div>
  )
}

export default App
