function sendEmail(to, subject, text){

    // CREATE A TRANSPORTER
    // TODO: Update with correct transporter inforaiton if this is ever used in a production env. 
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
        user: process.env.MUSERNAME,
        pass: process.env.MPASSWORD
        }
    });

    //CONSTRUCT EMAIL
    // TODO: Prior to deployment, remove the current "to" reference to the env variable and use the value passed into the procedure(the commented code).  
    let mailOptions = {
        from: process.env.FROM,
        to: to,
        subject: subject,
        text: text
        }

        transporter.sendMail(mailOptions, function(err, data){
            if(err) {
                console.log("ERROR ERROR ERROR:", err);
            } else {
                console.log("SUCCESS!");

            }

        });
}

exports.sendEmail = sendEmail;
