var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_time: {
    type: Date,
    default: Date.now //返回当前时间戳,这里不要写Date.now(),因为会即可调用，会导致直接写死一个值，之后再调用时间不会变。
  },
  last_modify_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: '/public/img/avatar-default.png'
  },
  bio: {
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1], //枚举
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    //0 账户正常
    //1 不可以可以评论
    //2 不可以登录使用
    enum: [0, 1, 2],
    default: 0
  }
})

module.exports = mongoose.model('User', UserSchema)