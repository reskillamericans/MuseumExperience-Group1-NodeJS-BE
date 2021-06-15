require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//==================================================
// DATABASE
//==================================================
const dbSetup = require('./database/setup');

dbSetup();

//==================================================
// Routes
//==================================================

//Placeholder routes for webpages
app.get('/', (req, res) => {
  res.send('Welcome to Museum App');
});


//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
