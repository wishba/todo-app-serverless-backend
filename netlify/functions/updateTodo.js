const sendQuery = require("./utils/sendQuery")

const UPDATE_TODO = `
  mutation($id: ID!, $netlify_id: String!, $activity: String!, $completed: Boolean) {
    updateTodo(id: $id, data: {netlify_id: $netlify_id, activity: $activity, completed: $completed}) {
      _id
      netlify_id
      activity
      completed
    }
  }
`

exports.handler = async event => {
  const { id, netlify_id, activity, completed } = JSON.parse(event.body)
  const variables = { id, netlify_id, activity, completed }

  try {
    const { updateTodo } = await sendQuery(
      UPDATE_TODO,
      variables
    )
    return {
      statusCode: 200,
      body: JSON.stringify(updateTodo)
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}