const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongodb.model('Chat', new Schema({
  name: String,
  users: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  messages: {
    type: [Schema.Types.ObjectId],
    ref: 'Message'
  }
}, {
  timestamps: true
}))
