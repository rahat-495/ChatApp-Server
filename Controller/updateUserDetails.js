
const getUserDetailsFromToken = require("../Helpers/getUserDetailsFromToken");
const UserModel = require("../Models/UserModel");

const updateUserDetails = async (req , res) => {
    try {
        
        const token = req.cookies.token || "" ;
        const user = await getUserDetailsFromToken(token) ;
        const {name , profile_pic} = req.body ;
        await UserModel.updateOne({_id : user?._id} , {name , profile_pic}) ;
        const newUserData = await UserModel.findById(user?._id) ;
        return res.send({message : "User details are updated !" , success : true , data : newUserData}) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
};

module.exports = updateUserDetails ;
