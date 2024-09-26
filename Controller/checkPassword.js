
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
const bcryptjs = require('bcryptjs') ;

const checkPassword = async (req , res) => {
    try {
        
        const {password , userId} = req.body ;
        const user = await UserModel.findById(userId) ;
        const verifyPass = await bcryptjs.compare(password , user?.password) ;
        if(!verifyPass){
            return res.status(400).send({message : "Plz check password !" , error : true}) ;
        }
        else{
            const token = jwt.sign({id : user?._id , email : user?.email} , process.env.JWT_SECRET_KEY , {expiresIn : '1d'}) ;
            return res.cookie('token' , token , {
                httpOnly : true ,
                secure : process.env.NODE_ENV === "production" ? true : false ,
                sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' , 
            }).send({success : true , token , message : "login SuccessFully !"}) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
};

module.exports = checkPassword ;
