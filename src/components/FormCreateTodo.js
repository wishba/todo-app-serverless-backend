import React, { useState } from 'react'
import netlifyIdentity from 'netlify-identity-widget'

function FormCreateTodo() {
  const [activity, setActivity] = useState('')
  const handleCreateTodo = async event => {
    event.preventDefault()
    try {
      await fetch('/.netlify/functions/createTodo', {
        method: 'POST',
        body: JSON.stringify({
          netlify_id: netlifyIdentity.currentUser().id,
          activity: activity
        })
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleCreateTodo}>
      <label htmlFor="">Activity:</label>
      <input
        type="text"
        name=""
        id=""
        onChange={event => setActivity(event.target.value)}
      />
      <input type="submit" value="Create Todo" />
    </form>
  )
}

export default FormCreateTodo