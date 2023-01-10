import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

import netlifyIdentity from 'netlify-identity-widget'

function App() {
  const [netlifyId, setNetlifyId] = useState('')

  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      setNetlifyId(netlifyIdentity.currentUser().id)
    }
    console.log(netlifyId);

    const allTodoById = () => {
      fetch(`/.netlify/functions/allTodoById`, {
        method: 'PUT',
        body: JSON.stringify({
          netlify_id: netlifyId
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    }
    allTodoById()
  }, [netlifyId])

  return (
    <>
      <header className="header">
        <h1 className='header__title'>Todo App</h1>
        <div className='header__button'>
          <button onClick={() => {
            netlifyIdentity.open()
            netlifyIdentity.on('login', (user) => {
              console.log(`${user.id} just logged in`)
              setNetlifyId(user.id)
            })
          }}>Login / Register</button>
          <button onClick={() => netlifyIdentity.logout()}>Logout</button>
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
