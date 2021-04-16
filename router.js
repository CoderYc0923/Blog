var express = require('express')

var md5 = require('blueimp-md5')

var User = require('./models/user')

var Topic = require('./models/topic')

var router = express.Router()

router.get('/', function (req, res) {
  Topic.find(function(err, data) {
    if (err) {
      return res.status(500).send('server err !')
    }
    console.log(data)
    res.render('index.html', {
      user: req.session.user,
      topic: data
    })
  })
})

router.get('/login', function (req, res) {
  res.render('login.html')
})

router.post('/login', function (req, res) {
  var body = req.body

  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  }, function (err, user) {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }

    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱或者密码错误'
      })
    }

    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: '登录成功'
    })
  })
})

router.get('/register', function (req, res) {
  res.render('register.html')
})

router.post('/register', function (req, res) {
  var body = req.body
  User.findOne({
    //查询邮箱或者昵称是否已存在，$or==或
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, function (err, data) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: '服务端错误'
      })
    }
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱或昵称已存在'
      })
    }
    //双重md5加密密码，防止密码被破
    body.password = md5(md5(body.password))

    new User(body).save(function (err, user) {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          message: '服务端错误'
        })
      }
      //注册成功，使用Session记录用户登陆状态
      req.session.user = user
      //json()方法接收一个对象作为参数，它会自动ba对象转为字符串再发送给浏览器
      res.status(200).json({
        err_code: 0,
        message: '注册成功'
      })
    })
  })
})

router.get('/logout', function (req, res) {
  req.session.user = null
  res.redirect('/')
})

router.get('/topics/new', function (req, res) {
  res.render('topic/new.html', {
    user: req.session.user
  })
})

router.post('/topics/new', function (req, res) {
  var body = req.body
  new Topic(body).save(function (err, data) {
    if (err) {
      return res.status(500).json({
        message: '发布失败'
      })
    }
    res.status(200).json({
      message: '发布成功'
    })
  })
})

//帖子内容暂无开发
// router.get('/topics/show', function (req, res) {
//   res.render('topic/show.html', {
//     user: req.session.user
//   })
// })


module.exports = router