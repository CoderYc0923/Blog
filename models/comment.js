var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema

var CommentSchema = new Schema({
  create_time: {
    type: Date,
    default: Date.now 
  },
  content: {
    type: String,
    default: ''
  }
})

module.exports = mongoose.model('Comment', CommentSchema)