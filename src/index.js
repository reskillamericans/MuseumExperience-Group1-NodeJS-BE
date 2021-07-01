require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { exhibitRoutes } = require("./routes/exhibitRoutes");
const authRoutes = require('./routes/authRoutes');
const { subscriptionRoutes } = require('./routes/subscriptionRoutes')

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//==================================================
// DATABASE
//==================================================
const dbSetup = require("./database/setup");

dbSetup();

//==================================================
// Routes
//==================================================
app.use(exhibitRoutes);
app.use('/auth', authRoutes);
app.use(subscriptionRoutes);
//==================================================
// Seeders
//==================================================

const { importData } = require("./seeders/exhibitsSeeder");
console.log(importData());

//Placeholder routes for webpages
app.get("/", (req, res) => {
  res.send("Welcome to Museum App");
});

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
