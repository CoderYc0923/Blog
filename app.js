const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const path = require('path')
const router = require('./router')

const app = new express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))



app.engine('html', require('express-art-template'))
app.set('views',path.join(__dirname,'./views/'))


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(session({
  secret: 'yechao',
  resave: false,
  saveUninitialized: false //真正需要存数据的时候再分配钥匙
}))

//挂载路由
app.use(router)

app.listen(3000)

console.log('服务器启动成功');