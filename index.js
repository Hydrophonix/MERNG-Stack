const { graphql, buildSchema } = require('graphql')

const db = {
  users: [
    { id: '1', email: 'boss@gmail@com', name: 'Boss' },
    { id: '2', email: 'hugo@gmail.com', name: 'Hugo' }
  ]
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String
    name: String
    avatarUrl: String
  }
`)

const rootValue = {
  users: () => db.users
}

graphql(
  schema,
  `
    {
      users {
        id
        email
      }
    }
  `,
  rootValue
).then(
  res => console.dir(res, { depth: null })
).catch(
  console.error
)
