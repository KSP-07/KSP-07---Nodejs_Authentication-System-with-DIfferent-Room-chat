const express= require('express');
const path=require('path');
const mysql=require('mysql');
const dotenv=require('dotenv');
//all chatgrp depend
// const path=require('path')
var http=require('http')
const socketio=require('socket.io')
const formatMessage=require('./util/messages');
const {userJoin , getCurrentUser ,userLeave, getRoomUsers}=require('./util/users');

// const { engine } = require('express/lib/application');

dotenv.config({ path:'./.env'});
const app=express();

var db=require('./db');
// var chatgrp=require('./server');      //importing server.js



const publicDirectory= path.join(__dirname,'./public')    //for our csss and javascript files
app.use(express.static(publicDirectory))    //to grab our static files like js and css

//Parse-url encoded bodies  (as sent by html forms)
app.use(express.urlencoded({extended:false}));

//Parse json bodies(as sent by api)
app.use(express.json());




const server=http.createServer(app);
const io=socketio(server)


const botName='CharCord Bot'

//run when client connects  
io.on('connection',socket =>{
    socket.on('joinRoom',({username ,room})=>{
        
        const user=userJoin(socket.id, username , room);
        
        socket.join(user.room);


        // console.log('New WS Connection..');   //this runs on the backend and console msg in terminal ans nothing shows on the browser console
        socket.emit('message',formatMessage(botName,'Welcome to ChatCord..dear..'))//this is being sent to client side which is read and showm in main.js
    
        //Broadcast when user connects..
        socket.broadcast.to(user.room).emit('message' ,formatMessage(botName,`${user.username} has joined the chat`));
        
        //Send users and room info
        io.to(user.room).emit('roomUsers',{ 
            room: user.room,
            users: getRoomUsers(user.room)
        })
        
    })
    
    //Listen for chat message
    socket.on('chatMessage',(msg)=>{
        console.log(msg)    //we want to emit this back to the client and to everybody
        
        
        const user=getCurrentUser(socket.id);

        //message was sent from the client to server...and now from here we are emmitting to everybody
        io.to(user.room).emit('message',formatMessage(user.username , msg))
    })
    
    //runs when client disconnects
    socket.on('disconnect',()=>{

        const user= userLeave(socket.id);   //we need to know which user left
        
        if(user){   //check for the user and if that exist
            io.emit('message',formatMessage(botName,`${user.username} has left the chat`))
            
            //Send users and room info
            io.to(user.room).emit('roomUsers',{ 
                room: user.room,
            users: getRoomUsers(user.room)
        })
    }

})   
})

app.set('view engine','hbs');   //default for hbs, they look into view folder

app.use(express.static(path.join(__dirname,'util')))    //if we do not make it static browser can not find it

// app.use(express.static(path.join(__dirname,'/Socket.io/socket.io.js')))
app.use(express.static(path.join(__dirname,'views'))) 
 
//defining routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))



server.listen(5000, ()=>{
    console.log(`Server running on port 5000...`)
})

