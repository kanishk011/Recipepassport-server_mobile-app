const nodemailer = require('nodemailer');


async function sendMail(toMail, otp) {

  // Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'itskanishk11@outlook.com',
        pass: 'Kani@1111'
    }
});

// setup e-mail data, even with unicode symbols
var mailOptions = {
    from: 'itskanishk11@outlook.com', // sender address (who sends)
    to: toMail, // list of receivers (who receives)
    subject: 'Recipe Passport OTP', // Subject line
    text: 'This is for OTP Verification', // plaintext body
    html: `Your OTP is ${otp}` // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
}
module.exports = { sendMail }