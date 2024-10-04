
const UserModel = require("../Models/UserModel");

const searchUser = async (req , res) => {
    try {
        
        const {search} = req.body ;
        const query = new RegExp(search , "i" , "g") ;
        const user = await UserModel.find({ "$or" : [ { name : query} , { email : query } ]}).select('-password') ;
        return res.send(user)
        
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
};

module.exports = searchUser ;
