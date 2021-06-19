const fs = require("fs");

//Load Exhibit Model
const Exhibit = require('../models/exhibit');

const exhibitsJson = require('../seeders/exhibits.json')

//Read JSON files
const exhibits = JSON.parse(
    fs.readFileSync(exhibitsJson, "utf-8")
);

console.log(exhibits);
