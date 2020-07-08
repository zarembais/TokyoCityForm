const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  about: { type: String },
  interests: [{ type: String }],
  info: [{ type: String }],
})

module.exports = model('Feedback', schema)
