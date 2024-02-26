// * IMPORTS * //
const sendEmail = require('./sendEmail')



// * FUNCTION * //
const sendVerificationEmail = async({name, email, verificationToken, origin}) => {
    
    const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`

    const message = `<b>Please confirm your email by clicking on the following link : <a href="${verifyEmail}">Verify Email</a> </b>`
    

    return sendEmail({to: email, 
        subject:'Verify Email', 
        html:`<h4> Hello ${name},</h4>
        ${message}`
    })
}

module.exports = sendVerificationEmail;