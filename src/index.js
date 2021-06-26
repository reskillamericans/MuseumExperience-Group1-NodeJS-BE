require("dotenv").config({ path: '../.env' });
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { questionsRoutes } = require('./routes/questionsRoutes')
const Question = require('../models/questions')

//middleware
app.use(express.json());
app.use(questionsRoutes);
app.use(express.urlencoded({ extended: true }));

//db setup
const dbSetup = require('./database/setup');
dbSetup();

//Placeholder routes for webpages
app.get("/", (req, res) => {
  res.send("Welcome to Museum App");
});

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
