require('dotenv').config()
let faunadb = require('faunadb')
let q = faunadb.query;
let adminClient = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export async function handler(event) {
  try {
    const results = await adminClient.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('todo-by-userId'), '1')
        ),
        (todoRef) => q.Get(todoRef)
      )
    )

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    }

  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}