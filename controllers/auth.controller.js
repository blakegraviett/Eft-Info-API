// * IMPROTS * //
const jwt = require('jsonwebtoken')
const User = require('../models/user.model');
const aysncwrapper = require("../lib/aysncwrapper")

// * CONTROLLERS * //

//  REGISTER //
const registerUser = aysncwrapper( async (req, res) => {
    // Save the user to the db
  newUser = await User.create(req.body)
  token = newUser.genJWT()

  // Send success
  res.status(200).json({
    success: true,
    data: {
        user: newUser,
        token: token,
        message: "SUCCESS!"
    }
   })
})

//  LOGIN  //
const loginUser = aysncwrapper( async (req, res) => {

// 1. Get email and password from request body
const {email, password} = req.body


// 2. Check that email and password both exist
if(!email || !password) {
    res.status(200).json({
        success: true,
        data: {
            message: "BAD REQUEST"
        }
       })
}


// 3. Check if the user with that email lives in the database
const foundUser = await User.findOne({email})


if(!foundUser) {
  return res.status(200).json({
    success: true,
    data: {
        message: "UNAUTHORIZED"
    }
   })
}

// 4. Check if the password for that user is the same as the password they passed in
const isMatch = await foundUser.comparePasswords(password);

if(!isMatch) {
    return res.status(200).json({
        success: true,
        data: {
            message: "UNAUTHORIZED"
        }
       })
}

// 5. Create a JWT Token
token = foundUser.genJWT()

// 6. Send success
res.status(200).json({
    success: true,
    data: {
        token: token,
        message: "SUCCESS!"
    }
   })
})




// * EXPORTS * //
module.exports = {
    registerUser,
    loginUser
} 