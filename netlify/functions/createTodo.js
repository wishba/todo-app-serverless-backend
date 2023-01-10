const sendQuery = require("./utils/sendQuery")

const CREATE_TODO = `
  mutation($netlify_id: String!, $activity: String!, $completed: Boolean) {
    createTodo(data: {netlify_id: $netlify_id, activity: $activity, completed: $completed}) {
      _id
      netlify_id
      activity
      completed
    }
  }
`

exports.handler = async event => {
  const { netlify_id, activity } = JSON.parse(event.body)
  const variables = { netlify_id, activity, completed: false }

  try {
    const { createTodo } = await sendQuery(
      CREATE_TODO,
      variables
    )

    return {
      statusCode: 200,
      body: JSON.stringify(createTodo),
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}