// * IMPROTS * //
const User = require('../models/user.model');
const Token = require('../models/token.model');
const aysncwrapper = require("../lib/aysncwrapper")
const crypto = require("crypto")
const sendVerificationEmail = require('../lib/sendVerificationEmail')

// * CONTROLLERS * //

//  REGISTER //
const registerUser = aysncwrapper( async (req, res) => {
    const {name, email, password} = req.body 
    const verificationToken = crypto.randomBytes(40).toString('hex');
    // Save the user to the db
  newUser = await User.create({name, email, password, verificationToken})

    // ORIGIN
    const origin = 'http://localhost:4200'

  // Send Email
  await sendVerificationEmail({
    name: newUser.name, 
    email: newUser.email, 
    verificationToken: newUser.verificationToken,
    origin: origin
})

  // Send success
  res.status(200).json({
    success: true,
    data: {
        user: newUser,
        message: "SUCCESS! Please Check email to verify account"
    }
   })
})

// VERIFY EMAIL
const verfiyEmail = aysncwrapper( async (req, res) => {
    
    const {verificationToken, email} = req.body;

    if(!email || !verificationToken) {
        return res.status(400).json({
            success: true,
            data: {
                message: "BAD REQUEST"
            }
           })
    }

    // FIND USER (EMAIL)
    const foundUser = await User.findOne({email})

    if(!foundUser) {
        return res.status(401).json({
          success: true,
          data: {
              message: "UNAUTHORIZED"
          }
         })
      }

    if(foundUser.verificationToken != verificationToken) {
        return res.status(400).json({
            success: false,
            data: {
                message: "INVALID REQUEST"
            }
           })
      }

      await foundUser.updateOne({
        isVerified: true,
        verified: Date.now(),
        verificationToken: ''
      })

     // Send success
  res.status(200).json({
    success: true,
    data: {
        user: email,
        message: "SUCCESS! Email verified"
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

if(!foundUser.isVerified) {
    return res.status(200).json({
        success: true,
        data: {
            message: "UNAUTHORIZED! Please verify your email"
        }
       })
}

// 5. Create a JWT Token
token = foundUser.genJWT()

// todo Create refresh token
// let refreshToken = '';

// refreshToken = crypto.randomBytes(40).toString('hex')
// const userAgent = req.headers['user-agent']
// const ip = req.ip
// const userToken = {refreshToken, ip, userAgent, user: foundUser._id}

// const newToken = await Token.create(userToken);

// todo Check for exsisting token



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
    loginUser,
    verfiyEmail
} 