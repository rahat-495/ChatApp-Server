
const UserModel = require("../Models/UserModel");

const checkEmail = async (req , res) => {
    try {
        const {email} = req.body ;
        const isEmailAxist = await UserModel.findOne({email}).select("-password") ;
        if(!isEmailAxist){
            return res.status(500).send({message : "Email is not axist !" , error : true}) ;
        }
        else{
            return res.send({message : "email verify !" , success : true , data : isEmailAxist}) ;
        }
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
};

module.exports = checkEmail ;
