require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { exhibitRoutes } = require("./routes/exhibitRoutes");
const questionsRoutes = require("./routes/questionsRoute");
const commentsRoutes = require('./routes/commentsRoute');
const authRoutes = require("./routes/authRoutes");

//==================================================
// DATABASE
//==================================================
const dbSetup = require("./database/setup");
dbSetup();

//==================================================
// Routes
//==================================================
app.use(exhibitRoutes);
app.use("/auth", authRoutes);
app.use(questionsRoutes);
app.use(commentsRoutes)

//==================================================
// Seeders
//==================================================

const { importData } = require("./seeders/exhibitsSeeder");
console.log(importData());

//Placeholder routes for webpages
app.get("/", (req, res) => {
  res.send("Welcome to Museum App");
});

//error handler utility
app.use((err, req, res, next) => {
  const { status = 500, message = 'Sorry, something went wrong' } = err;
  res.status(status).json(message);
});

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
