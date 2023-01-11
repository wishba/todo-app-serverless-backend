import React, { useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function App() {
  netlifyIdentity.init()

  const allTodoById = async () => {
    try {
      const response = await fetch('/.netlify/functions/allTodoById', {
        method: 'PUT',
        body: JSON.stringify({
          netlify_id: netlifyIdentity.currentUser().id
        })
      })
      const data = await response.json()

      console.log(data)

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (netlifyIdentity.currentUser() !== null) {
      allTodoById()
    }
  }, [])

  return (
    <div>
      <button onClick={() => netlifyIdentity.open()}>Login / Register</button>
      <button onClick={() => netlifyIdentity.logout()}>Logout</button>
    </div>
  )
}

export default App



// import React, { useEffect, useState } from 'react'
// import netlifyIdentity from 'netlify-identity-widget'

// function App() {
  // const [netlifyId, setNetlifyId] = useState('')
  // const [allTodo, setAllTodo] = useState([])

  // netlifyIdentity.on('login', user => {
    // setNetlifyId(user.id)
  // })

  // netlifyIdentity.on('logout', () => {
    // setNetlifyId('')
  // })

  // const allTodoById = async () => {
  //   try {
  //     const response = await fetch('/.netlify/functions/allTodoById', {
  //       method: 'PUT',
  //       body: JSON.stringify({
  //         netlify_id: netlifyId
  //       })
  //     })
  //     const data = await response.json()
  //     setAllTodo(data)

  //     console.log(data)

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const allTodoById = () => {
    // fetch('/.netlify/functions/allTodoById', {
      // method: 'PUT',
      // body: JSON.stringify({
        // netlify_id: netlifyId
      // })
    // })
      // .then(response => response.json())
      // .then(data => {
        // setAllTodo(data)
        // console.log(data)
      // })
      // .catch(error => console.error(error));
  // }
  // allTodoById()

  // const [activity, setActivity] = useState('')
  // const [newTodo, setNewTodo]=useState()
  // const handleCreateTodo = async event => {
    // event.preventDefault()
    // try {
      // await fetch('/.netlify/functions/createTodo', {
        // const response = await fetch('/.netlify/functions/createTodo', {
        // method: 'POST',
        // body: JSON.stringify({
          // netlify_id: netlifyIdentity.currentUser().id,
          // activity: activity
        // })
      // })
      // const data = await response.json()

      // console.log(data);
      // setNewTodo({
      //   _id: '',
      //   netlify_id: netlifyIdentity.currentUser().id,
      //   activity: activity,
      //   completed:false
      // })

      // allTodoById()

    // } catch (error) {
      // console.error(error);
    // }
  // }

  // useEffect(() => {
    // if (netlifyIdentity.currentUser() !== null) {
      // setNetlifyId(netlifyIdentity.currentUser().id)
    // }

    // allTodoById()

//   }, [netlifyId])

//   return (
//     <div>
//       <button onClick={() => netlifyIdentity.open()}>Login / Logout</button>
//       <button onClick={() => netlifyIdentity.logout()}>Logout</button>

//       <form onSubmit={handleCreateTodo}>
//         <label htmlFor="">Activity:</label>
//         <input
//           type="text"
//           name=""
//           id=""
//           onChange={event => setActivity(event.target.value)}
//         />
//         <input type="submit" value="Create Todo" />
//       </form>

//       <ul>
//         {allTodo.map((todo) => (
//           <li key={todo._id}>
//             <p>{todo.completed ? ('Completed') : ('Uncompleted')} - {todo.activity}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default App;

// import logo from './logo.svg';
// import './App.css';
// import { useEffect, useState } from 'react';

// import netlifyIdentity from 'netlify-identity-widget'

// function App() {
// const [netlifyId, setNetlifyId] = useState('')
// const [allTodo, setAllTodo] = useState([])

// const allTodoById = async () => {
// try {
// const response = await fetch(`/.netlify/functions/allTodoById`, {
// method: 'PUT',
// body: JSON.stringify({
// netlify_id: netlifyId
// })
// })
// const todo = await response.json()
// setAllTodo(todo)

// } catch (error) {
// console.error(error);
// }
// }

// useEffect(() => {
// if (netlifyIdentity.currentUser() !== null) {
// setNetlifyId(netlifyIdentity.currentUser().id)
// }

// allTodoById()
// }, [])

// const [createActivity, setCreateActivity] = useState('')
// const createTodo = async event => {
// event.preventDefault()

// try {
// await fetch('/.netlify/functions/createTodo', {
// method: 'POST',
// body: JSON.stringify({
// netlify_id: netlifyId,
// activity: createActivity
// })
// })

// allTodoById()
// setCreateActivity('')
// } catch (error) {
// console.error(error);
// }
// }

// const updateTodo = async ({ event, todo }) => {
// const updateTodo = async event => {
// event.preventDefault()
// console.log(todo);

// try {
//   await fetch('/.netlify/functions/updateTodo', {
//     method: 'PUT',
//     body: JSON.stringify({
//       id: '353524794607534679',
//       netlify_id: '14a3b21b-1df9-4070-b35c-a03dfa183458',
//       activity: "test send 1018",
//       completed: false
//     })
//   })

//   allTodoById()
// } catch (error) {
//   console.error(error);
// }
// }

//   return (
//     <div>
//       tes
//     </div>
// <div>
// <header className="header">
// <h1 className='header__title'>Todo App</h1>
// <div className='header__button'>
// <button onClick={() => {
// netlifyIdentity.open()
// netlifyIdentity.on('login', user => {
// setNetlifyId(user.id)
// netlifyIdentity.close()
// })
// }}>Login / Register</button>
// <button onClick={() => {
// netlifyIdentity.logout()
// netlifyIdentity.on('logout', () => setNetlifyId(''))
// }}>Logout</button>
// </div>
// </header>

// <section>
// <div className='section__not-login'>
// <img src={logo} className="section__logo" alt="logo" />
// <p>Login to see your todo</p>
// </div>

// <form onSubmit={createTodo} className='form' action="">
// <label className='form__label' htmlFor="">
// Activity :
// <input
// onChange={event => setCreateActivity(event.target.value)}
// value={createActivity}
// className='form__text'
// type="text"
// />
// </label>
// <input className='form__submit' type="submit" value="Todo" />
// </form>

// <ul className='list__container'>
// {allTodo.map((todo) => (
// <li className='list' key={todo._id}>
// <div className='list__flex'>
 // <input className='list__check' type="checkbox" name="" id="" />
 // <p className='list__activity'>{todo.completed ? ('completed') : ('uncompleted')} - {todo.activity}</p>
 // <div className='list__button'>
   // <button >Edit</button>
   // <button >Cancel</button>
 // </div>
// </div>

// <form onSubmit={updateTodo} className='form' action="">
 // <label className='form__label' htmlFor="">
   // Activity :
   // <input
     // className='form__text'
     // type="text"
   // />
 // </label>
 // <label className='form__label' htmlFor="">
   // Completed :
   // <input className='form__check' type="checkbox" name="" id="" />
 // </label>
 // <input className='form__submit' type="submit" value="Todo" />
// </form>
// </li>
// ))}
// </ul>
// </section>
// </div>
// );
// }

// export default App;
