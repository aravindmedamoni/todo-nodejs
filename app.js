var express = require('express')
var todoController = require('./controllers/todoController')

var app = express()

//for setting up the templates
app.set('view engine','ejs')

//for static files
app.use(express.static('./public'))

//fire controller
todoController(app)

//listen to the port
app.listen(3001)


