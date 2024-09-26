
const getUserDetailsFromToken = require("../Helpers/getUserDetailsFromToken");

const userDetails = async (req , res) => {
    try {
        
        const token = req.cookies.token || "" ;
        const user = await getUserDetailsFromToken(token) ;
        return res.send({message : 'user details !' , data : user }) ;

    } catch (error) {
        return res.send({message : error.message || error , error : true}) ;
    }
};

module.exports = userDetails ;
