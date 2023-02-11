const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  User_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Task', taskSchema)