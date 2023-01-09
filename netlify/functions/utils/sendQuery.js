const axios = require("axios")
require("dotenv").config()

module.exports = async (query, variables) => {
  const { data: { data, error } } = await axios({
    url: "https://graphql.fauna.com/graphql",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNADB_SECRET}`
    },
    data: {
      query,
      variables
    }
  })

  if (error) {
    console.error(error)
    throw error
  }

  return data
}