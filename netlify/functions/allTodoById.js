const sendQuery = require("./utils/sendQuery")

const GET_TODOS = `query($netlify_id: String!) { allTodoById(netlify_id: $netlify_id) { data { _id netlify_id activity completed } } }`

exports.handler = async (event) => {
  try {
    const netlify_id = event.queryStringParameters.netlify_id
    const variables = { netlify_id }
    const response = await sendQuery(GET_TODOS, variables)
    const data = response.allTodoById.data
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}