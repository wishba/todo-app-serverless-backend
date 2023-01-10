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
    <>
      <header className="header">
        <h1 className='header__title'>Todo App</h1>
        <div className='header__button'>
          {
            thereIsUser ? (
              <button onClick={() => netlifyIdentity.logout()}>Logout</button>
            ) : (
              <button onClick={() => netlifyIdentity.open()}>Login / Register</button>
            )
          }
        </div>
      </header>

      <section className='section'>
        <img src={logo} className="section__logo" alt="logo" />
        <p>Login to see your todo</p>
      </section>
    </>
  );
}

export default App;
