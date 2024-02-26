// * IMPORTS * // 
const nodemailer = require('nodemailer')
const nodemailerConfig = require('./nodemailerConfig')

// * FUNCTIONS * //
const sendEmail = async ({to, subject, html}) => {

    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: '"EFT Info" <eft-info@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
      });
    
}

module.exports = sendEmail;
