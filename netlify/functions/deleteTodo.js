const sendQuery = require("./utils/sendQuery")

const DELETE_TODO = `
  mutation($id: ID!) {
    deleteTodo(id: $id) {
      _id
    }
  }
`

exports.handler = async event => {
  const { id } = JSON.parse(event.body)
  const variables = { id }

  try {
    const { deleteTodo } = await sendQuery(
      DELETE_TODO,
      variables
    )
    return {
      statusCode: 200,
      body: JSON.stringify(deleteTodo)
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}