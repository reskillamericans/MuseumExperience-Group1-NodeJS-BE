require("dotenv").config({ path: "../../.env" });
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const sendEmail = function (to, subject, message, from) {
    transporter.sendMail({
    from: process.env.SENDER_ADDRESS, 
    to: to,
    subject: subject,
    message: message
    }, (error, data) => {
        if(error) {
            console.log(error);
        } else {
            console.log('Email sent!');
        }
    })
};



