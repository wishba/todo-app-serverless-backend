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
        <button onClick={() => netlifyIdentity.open()}>Login - Register</button>
        <button onClick={() => netlifyIdentity.logout()}>Logout</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Login to see your todo</p>
      </header>
    </div>
  );
}

export default App;
