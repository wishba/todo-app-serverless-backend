require('dotenv').config()
let faunadb = require('faunadb')
let q = faunadb.query;
let adminClient = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

export async function handler(event) {
  try {
    const results = await adminClient.query(
      q.Update(
        q.Ref(q.Collection('todo'), '390220616456733265'),
        {
          data: {
            "userId": "1",
            "todo": "do some typing",
            "finished": true
          }
        },
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