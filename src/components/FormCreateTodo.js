import React from 'react'

function FormCreateTodo() {
  const handleCreateTodo = async event => event.preventDefault()

  return (
    <form onSubmit={handleCreateTodo}>
      <label htmlFor="">Activity:</label>
      <input type="text" name="" id="" />

      <input type="submit" value="Create Todo" />
    </form>
  )
}

export default FormCreateTodo