import reactLogo from './assets/react.svg'
import './App.css'
import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    if (netlifyIdentity.currentUser() != null) {
      setUserName(` ${netlifyIdentity.currentUser().user_metadata.full_name}`)
    }

    netlifyIdentity.on('login', user => {
      setUserName(` ${user.user_metadata.full_name}`)
      netlifyIdentity.close()
    })
    netlifyIdentity.on('logout', () => {
      setUserName('')
      netlifyIdentity.close()
    })
  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => netlifyIdentity.open()}>
          {userName ? 'Logout' : 'Login / Signup'}
        </button>
        <p>Hello{userName}!</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
