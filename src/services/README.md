# Museum App

SETUP: 
Before merging the "nodemailer" branch into your branch you need to do the following:
    1) Install nodemailer " npm install nodemailer -S "
    2) Install dotenv " npm install dotenv -S "
    3) Create a mailtrap account:
        a) After creating your account navigate to "Inboxes" 
        b) Change the "Integrations" dropdown to "Nodemailer". You will need this information in the next step. 
    4) within the services folder create a .env file with the following fields which. 
        HOST = ""
        PORT = 
        MUSERNAME = ""
        MPASSWORD = ""
        
        Field mapping  .env =>  mailtrap 
        HOST => host
        PORT => port
        MUSERNAME => user
        MPASSWORD => pass
    
    6) Click on "Email Address" on the mailtrap site and copy the "Inbox Email Address" 
    7) Navigate to the email.js file. Paste the email address in the "from" and "to" in the "CONSTRUCT EMAIL" email section of the code.
    8) Run the code. You should see an email should be sent to the mailtrap account. 

    