import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget'

function App() {
  useEffect(() => {
    netlifyIdentity.init()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={() => {
            netlifyIdentity.open()
            netlifyIdentity.on('login', (user) => {
              console.log(user.id)
            })
          }}>Login</button>
          <button onClick={() => netlifyIdentity.logout()}>Logout</button>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
