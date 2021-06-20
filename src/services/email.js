//Create a utilities or services folder. 
//Create a function with 4 param 
//Keep functionality the same though. Keep .env file. 

require("dotenv").config(); 

const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require("body-parser");
const app = express()


//BodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


function sendEmail(from, to, subject, text){

    // CREATE A TRANSPORTER
    // TODO: Update with actual email address if this is ever used in a production env. 
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
        user: process.env.MUSERNAME,
        pass: process.env.MPASSWORD
        }
    });

    //CONSTRUCT EMAIL
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text
        }

        transporter.sendMail(mailOptions, function(err, data){
            if(err) {
                console.log( "HOST", process.env.HOST)
                console.log( "PASS", process.env.PASS) 
                console.log( "USER", process.env.USER)
                console.log( "PORT", process.env.PORT)


                console.log("ERROR ERROR ERROR:", err);
            } else {
                console.log("SUCCESS!");

            }

        });
}
