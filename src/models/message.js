const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongodb.model('Chat', new Schema({
  body: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
}))
