
const jwt = require('jsonwebtoken') ;
const UserModel = require('../Models/UserModel');

const getUserDetailsFromToken = async ( token ) => {
    try {
        
        if(token){
            const decoded = await jwt.decode(token , process.env.JWT_SECRET_KEY) ;
            const user = await UserModel.findById(decoded?.id).select('-password') ;
            return user ;
        }
        else{
            return {
                message : "session out !" ,
                logout : true ,
            }
        }

    } catch (error) {
        return console.log(error) ;
    }
};

module.exports = getUserDetailsFromToken ;
