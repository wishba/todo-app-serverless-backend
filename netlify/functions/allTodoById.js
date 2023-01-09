const sendQuery = require("./utils/sendQuery")

const GET_TODOS = `
  query {
    allTodoById(netlify_id: "1") {
      data {
        _id
        netlify_id
        activity
        completed
      }
    }
  } 
`

exports.handler = async () => {
  try {
    const response = await sendQuery(GET_TODOS)
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