require("dotenv").config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const path = require('path');
const Question = require('./models/questions');
const questionsRoutes = require('./routes/questionsRoute')
const AppError = require('./AppError');
const dbSetup = require('./database/setup');
dbSetup();
app.use(express.json());
app.use(questionsRoutes)
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
