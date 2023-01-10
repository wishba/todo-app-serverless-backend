import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import netlifyIdentity from 'netlify-identity-widget'

function App() {
  const [thereIsUser, setThereIsUser] = useState()

  useEffect(() => {
    netlifyIdentity.init()

    if (netlifyIdentity.currentUser() !== null) {
      console.log(netlifyIdentity.currentUser());
      setThereIsUser(true)
    }

    netlifyIdentity.on('login', () => {
      netlifyIdentity.close()
      setThereIsUser(true)
    })

    netlifyIdentity.on('logout', () => {
      setThereIsUser(false)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {
          thereIsUser ? (
            <button onClick={() => netlifyIdentity.logout()}>Logout</button>
          ) : (
            <div>
              <div>
                <button onClick={() => netlifyIdentity.open()}>Login - Register</button>
              </div>
              <img src={logo} className="App-logo" alt="logo" />
              <p>Login to see your todo</p>
            </div>
          )
        }
      </header>
    </div>
  );
}

export default App;
