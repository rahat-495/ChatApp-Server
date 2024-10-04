
const {Server} = require("socket.io");
const express = require("express");
const http = require("http");
const getUserDetailsFromToken = require("../Helpers/getUserDetailsFromToken");
const UserModel = require("../Models/UserModel");
const app = express();

const server = http.createServer(app) ;
const io = new Server(server , {
    cors : {
        credentials: true ,
        origin : ["http://localhost:5173"] ,
    }
}) ;

const onlineUser = new Set() ;

io.on('connection' , async (socket) => {

    // on connect user -----------
    console.log("user are connected !")

    const token = socket.handshake.auth.token ;
    const user = await getUserDetailsFromToken(token) ;
    
    socket.join(user?._id) ;
    onlineUser.add(user?._id?.toString()) ;

    io.emit('onlineUser' , Array.from(onlineUser)) ;

    socket.on('messagePage' , async (userId) => {
        const userDetails = await UserModel.findById(userId).select('-password') ;
        const payload = {
            _id : userDetails?._id ,
            name : userDetails?.name ,
            email : userDetails?.email ,
            online : onlineUser.has(userId) ,
            profile_pic : userDetails?.profile_pic ,
        }
        socket.emit('messageUser' , payload) ;
    })

    // Disconnect ----------------
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id) ;
    });

})

module.exports = { app , server } ;
