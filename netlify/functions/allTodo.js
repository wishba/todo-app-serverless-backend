const faunadb = require("faunadb");

exports.handler = async (event, context) => {
  const q = faunadb.query;
  const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });

  try {
    const searchResults = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_todo"), "14a3b21b-1df9-4070-b35c-a03dfa183458")),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(searchResults),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
