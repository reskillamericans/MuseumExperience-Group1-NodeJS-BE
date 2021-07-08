require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const path = require("path");
const Question = require("./models/questions");
const AppError = require("./AppError");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

const { exhibitRoutes } = require("./routes/exhibitRoutes");
const questionsRoutes = require("./routes/questionsRoute");
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

//==================================================
// Seeders
//==================================================

const { importData } = require("./seeders/exhibitsSeeder");
console.log(importData());

//Placeholder routes for webpages
app.get("/", (req, res) => {
  res.send("Welcome to Museum App");
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//error handler middleware
app.use((err, req, res, next) => {
  const { status = 500, message = 'Sorry, something went wrong' } = err;
  res.status(status).json(message);
});

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
