
const express = require("express");
const registerUser = require("../Controller/registerUser");
const checkEmail = require("../Controller/checkEmail");
const checkPassword = require("../Controller/checkPassword");
const userDetails = require("../Controller/userDetails");
const logOut = require("../Controller/logOut");
const updateUserDetails = require("../Controller/updateUserDetails");
const searchUser = require("../Controller/searchUser");
const router = express.Router() ;

router.post('/register' , registerUser) ; // to register an user ---------
router.post('/checkEmail' , checkEmail) ; // to check the user email ---------
router.post('/checkPassword' , checkPassword) ; // to check the user pass ---------
router.get('/userDetails' , userDetails) ; // to get user details ---------
router.get('/logOut' , logOut) ; // to logOut the user ---------
router.post('/updateUser' , updateUserDetails) ; // to update the user details ---------
router.post('/searchUser' , searchUser) ; // to get the users ---------

module.exports = router ;
