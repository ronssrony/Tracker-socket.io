const express = require('express') 
const app = express() ; 
const socketio = require('socket.io')
const http = require('http') ; 
const path = require('path')
const server = http.createServer(app) ;
const io = socketio(server); 

app.set('view engine' , 'ejs') ; 
app.use(express.static(path.join(__dirname,'public'))) ;


io.on('connection',function(socket){
    socket.on('send-location' , function(location){
        io.emit('receive-location' , {id:socket.id , ...location}) ;
    })

    socket.on('disconnected', function(id){
        io.emit('user-disconnected',socket.id)
    })

    console.log('connected')
})

app.get('/',function(req,res){
    res.render('index')
})


server.listen(3100)
