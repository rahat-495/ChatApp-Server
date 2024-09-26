
const mongoose = require("mongoose") ;
require('dotenv').config() ;

const connectDB = async () => {
    try {
        
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j5p6m.mongodb.net/ChatApp?retryWrites=true&w=majority&appName=Cluster0`) ;
        const connection = mongoose.connection ;

        connection.on('connected' , () => {
            console.log("Connected To Data Base !") ;
        })

        connection.on('error' , (error) => {
            console.log("Some thing went wrong in MongoDb ! " , error) ;
        })
        
    } catch (error) {
        console.log("Some Thing Went Wrong ! " , error)
    }
}

module.exports = connectDB ;
