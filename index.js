const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const db = {
  users: [
    { id: '1', email: 'boss@gmail@com', name: 'Boss', avatarUrl: 'https://gravatar.com/...'},
    { id: '2', email: 'hugo@gmail@com', name: 'Hugo', avatarUrl: 'https://gravatar.com/...'}
  ],
  messages: [
    {id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
    {id: '2', userId: '2', body: 'Hi', createdAt: Date.now() },
    {id: '3', userId: '1', body: 'Whats up', createdAt: Date.now() }
  ]
}

class User {
  constructor (user) {
    Object.assign(this, user)
  }

  get messages () {
    return db.messages.filter(message => message.userId === this.id)
  }
}

const schema = buildSchema(`
  type Query {
    users: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User
  }

  type User {
    id: ID!
    email: String
    name: String
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String
  }
`)

const rootValue = {
  users: () => db.users.map(user => new User(user)),
  user: args => db.users.find(user => user.id === args.id),
  messages: () => db.messages,
  addUser: ({ email, name }) => {
    const user = {
      id: crypto.randomBytes(10).toString('hex'),
      email,
      name
    }

    db.users.push(user)

    return user
  }
}

const app = express()
const port = 3000

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
}))

app.listen(port, () => console.log(`Listening on ${port}`))
