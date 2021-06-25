require("dotenv").config({ path: "../../.env" });
const nodemailer = require("nodemailer");


const sendEmail = async ({from = SENDER_ADDRESS, to, subject, message}) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    await transporter.sendMail({from, to, subject, message}, (error, data) => {
        if(error) {
            console.log(error);
        } else {
            console.log('Email sent!');
        }
    });
};