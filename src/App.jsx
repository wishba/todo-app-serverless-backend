import './App.css'
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (netlifyIdentity.currentUser() != null) {
      setUserName(netlifyIdentity.currentUser().user_metadata.full_name)
      console.log(netlifyIdentity.currentUser().id);
    }

    netlifyIdentity.on('login', user => {
      setUserName(user.user_metadata.full_name)
      netlifyIdentity.close()
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

      <a href={`/.netlify/functions/hello?name=${userName}`} target="_blank" rel="noopener noreferrer">test netlify function</a>
    </div>
  )
}

export default App
