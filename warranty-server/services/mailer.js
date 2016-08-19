

(function (mailer) {

    var nodemailer = require('nodemailer');
    var smtpConfig = require('../config').smtp;
    var fromAddress = require('../config').fromAddress;
    var transporter = nodemailer.createTransport(smtpConfig);

    mailer.sendMail = function (to, subject, text, attachments, next) {
        var mailOptions = {
            from: fromAddress,
            to: to,
            subject: subject,
            text: text,
            attachments: attachments
        };
        //console.log(mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                next(error, info);
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            next(error, info);
        })
    }

})(module.exports);