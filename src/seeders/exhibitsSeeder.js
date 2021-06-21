require("dotenv").config({ path: "../../.env" });
const fs = require("fs");
const path = require("path");

const dbSetup = require("../database/setup");

dbSetup();

//Load Exhibit Model
const { ExhibitModel } = require("../models/exhibit");

//Read JSON files
const exhibits = JSON.parse(fs.readFileSync(`${__dirname}/exhibits.json`, "utf-8"));

//Import data into DB
exports.importData = async () => {
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
}
