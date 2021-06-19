require("dotenv").config({ path: '../.env'});
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");


const dbSetup = require('../database/setup');

dbSetup();

//Load Exhibit Model
const { ExhibitModel } = require("../models/exhibit");


//Read JSON files
const exhibits = JSON.parse(
    fs.readFileSync('../seeders/exhibits.json', "utf-8")
);

//Import data into DB
const importData = async () => {
    try {
        await ExhibitModel.create(exhibits);
        console.log("Data imported");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};


if (process.argv[2] === "-i") {
    importData().then();
};

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

   
