const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


exports.sendMailVerify = async (username, userEmail, jwt) => {
    const clientPort = process.env.CLIENT_PORT;

    const verifyUrl = `${clientPort}/register-response?email=${userEmail}&token=${jwt}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    const handlebarOptions = {
        viewEngine: {
            extName: ".handlebars",
            partialsDir: path.resolve("./src/services/nodemailerService/email-templates"),
            defaultLayout: false,
        },
        viewPath: path.resolve("./src/services/nodemailerService/email-templates"),
        extName: ".handlebars",
    };

    transporter.use(
        "compile",
        hbs(handlebarOptions)
    );

    const mailOptions = {
        from: 'fooxstore.book@gmail.com',
        to: userEmail,
        subject: 'FooxStore || Verify Email',
        template: 'verify-mail',
        context: {
            username: username,
            userEmail: userEmail,
            verifyUrl: verifyUrl,
        }
    };


    transporter.sendMail(mailOptions, function (err, data) {
        // console.log('sended mail');
        if (err) {
            console.log("Error " + err);
        } else {
            console.log("Email sent successfully");
        }
    });
}

