

(function (mailer) {

    var nodemailer = require('nodemailer');
    var smtpConfig = require('../config').smtp;
    var transporter = nodemailer.createTransport(smtpConfig);
    // create reusable transporter object using the default SMTP transport

    mailer.sendMail = function (from, to, subject, text, attachments) {
        transporter.sendMail({
            from: from, to: to, subject: subject, text: text
        }, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        })
    }

})(module.exports);