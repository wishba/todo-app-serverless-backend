import './App.css'
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState()

  const fetchTodo = async (userId) => {
    try {
      const response = await fetch('/.netlify/functions/todosRead', {
        method: 'POST',
        body: JSON.stringify({
          userId
        })
      })

      const data = await response.json()
      console.log(data);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (netlifyIdentity.currentUser() != null) {
      setUserName(netlifyIdentity.currentUser().user_metadata.full_name)
      console.log(netlifyIdentity.currentUser().id);
      fetchTodo(netlifyIdentity.currentUser().id)
    }

    netlifyIdentity.on('login', user => {
      setUserName(user.user_metadata.full_name)
      netlifyIdentity.close()
      console.log(netlifyIdentity.currentUser().id);
      fetchTodo(netlifyIdentity.currentUser().id)
    })

    netlifyIdentity.on('logout', () => {
      setUserName('')
      netlifyIdentity.close()
    })
  }, [])

  return (
    <div>
      <button onClick={() => netlifyIdentity.open()}>
        {userName ? 'Logout' : 'Login / Signup'}
      </button>

      <h1>Hello{userName ? ` ${userName}!` : '!'}</h1>
    </div>
  )
}

export default App
