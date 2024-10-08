
const {Server} = require("socket.io");
const express = require("express");
const http = require("http");
const getUserDetailsFromToken = require("../Helpers/getUserDetailsFromToken");
const UserModel = require("../Models/UserModel");
const { ConversationModel, MessageModel } = require("../Models/ConversationModel");
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
    
    socket.join(user?._id?.toString()) ;
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

        const getConversationMessage = await ConversationModel.findOne({ $or : [ { sender : user?._id } , { receiver : userId } ] }).populate('messages').sort({ updatedAt : -1 }) ;
        // preveus messages -----------
        socket.emit("message" , getConversationMessage.messages)
    })


    // new message ---------------
    socket.on('newMessage' , async (data) => {
        
        let conversation = await ConversationModel.findOne({ $or : [ { sender : data?.sender } , { receiver : data?.receiver } ] }) ;
        if(!conversation){
            const createConversation = await ConversationModel({
                sender : data?.sender ,
                receiver : data?.receiver ,
            }) ;
            conversation = await createConversation.save() ;
        }
        const message = new MessageModel({
            text : data?.text ,
            imageUrl : data?.imageUrl ,
            videoUrl : data?.videoUrl ,
            msgByUserId : data?.msgByUserId ,
        }) ;
        const saveMessage = await message.save() ;
        const updateConversation = await ConversationModel.updateOne({_id : conversation?._id} , { $push : {messages : saveMessage?._id} }) ;
        const getConversationMessage = await ConversationModel.findOne({ $or : [ { sender : data?.sender } , { receiver : data?.receiver } ] }).populate('messages').sort({ updatedAt : -1 }) ;
        io.to(data?.sender).emit('message' , getConversationMessage?.messages) ;
        io.to(data?.receiver).emit('message' , getConversationMessage?.messages) ;

    })

    // Disconnect ----------------
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id) ;
    });

})

module.exports = { app , server } ;
