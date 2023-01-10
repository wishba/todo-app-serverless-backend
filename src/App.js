import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import netlifyIdentity from 'netlify-identity-widget'

function App() {
  const [thereIsUser, setThereIsUser] = useState()

  const allTodoById = async () => {
    try {
      const response = await fetch(`/.netlify/functions/allTodoById`, {
        method: 'PUT',
        body: JSON.stringify({
          netlify_id: netlifyIdentity.currentUser().id
        })
      })

      const data = await response.json()

      console.log(data);
      // console.log(netlifyIdentity.currentUser().id);

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    netlifyIdentity.init()

    if (netlifyIdentity.currentUser() !== null) {
      setThereIsUser(true)
    }

    netlifyIdentity.on('login', () => {
      netlifyIdentity.close()
      setThereIsUser(true)
    })

    netlifyIdentity.on('logout', () => {
      setThereIsUser(false)
    })

    allTodoById()
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
