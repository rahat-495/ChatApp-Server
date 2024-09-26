
const UserModel = require('../Models/UserModel') ;
const bcryptjs = require('bcryptjs') ;

const registerUser = async (req , res) => {
    try {
        
        const { name , email , password , profile_pic } = req.body ;
        const isUserAxist = await UserModel.findOne({email}) ;
        
        if(isUserAxist){
            return res.status(400).send({ message : "User already axist !" , error : true }) ;
        }
        else{
            const hassetPass = await bcryptjs.hash(password , 10) ;
            const payload = {
                name ,
                email , 
                profile_pic ,
                password : hassetPass ,
            }
            const saveUser = await new UserModel(payload).save() ;
            return res.send({...saveUser , success : true , message : "User saved !"}) ;
        }

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
};

module.exports = registerUser ;
