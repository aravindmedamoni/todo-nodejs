var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://test:test@cluster0-dkcv3.mongodb.net/test?retryWrites=true&w=majority`)

var todoSchema = new mongoose.Schema({
    item : String
})

var Todo = mongoose.model('Todo',todoSchema)

// var itemOne = Todo({item:'buy flowers'}).save((error)=>{
//     if(error) throw error
//     console.log('item saved');
    
// })

//var data = [{item:'buy a car'},{item:'complete the python course'},{item:'complete node js'}]

var urlEncoderParser = bodyParser.urlencoded({extended:false})

module.exports = (app)=>{
    //for getting the all todos
    app.get('/todo',(req,res)=>{
        //getting the todos from mongo db
        Todo.find({},(error,data)=>{
            if(error) throw error
            res.render('todo',{todos:data})
        })
        
    })

    //for creating and updating the todos
    app.post('/todo',urlEncoderParser,(req,res)=>{
        //store the todo in the mongo db
        Todo(req.body).save((error,data)=>{
            if(error) throw error
            res.json(data)
        })
        
        
    })

    //for deleting the todos
    app.delete('/todo/:item',(req,res)=>{

        //delete todo from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove((error,data)=>{
            if(error) throw error
            res.json(data)
        })
    })
}