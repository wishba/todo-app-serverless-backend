import React from 'react'

function FormCreateTodo() {
  const handleCreateTodo = async event => {
    event.preventDefault()

    try {
      await fetch('/.netlify/functions/createTodo', {
        method: 'POST',
        body: JSON.stringify({
          netlify_id: "14a3b21b-1df9-4070-b35c-a03dfa183458",
          activity: "test 12:17"
        })
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleCreateTodo}>
      <label htmlFor="">Activity:</label>
      <input type="text" name="" id="" />

      <input type="submit" value="Create Todo" />
    </form>
  )
}

export default FormCreateTodo