
const logOut = async (req , res) => {
    try {
        return res.cookie('token' , "" , {
            httpOnly : true ,
            secure : process.env.NODE_ENV === "production" ? true : false ,
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict' , 
        }).send({success : true , message : "logOut User !"}) ;
    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
};

module.exports = logOut ;
