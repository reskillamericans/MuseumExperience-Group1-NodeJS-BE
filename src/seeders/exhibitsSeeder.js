const fs = require("fs");

//Load Exhibit Model
const Exhibit = require('../models/exhibit');


//Read JSON files
const exhibits = JSON.parse(
    fs.readFileSync('../seeders/exhibits.json', "utf-8")
);

//Import data into DB
const importData = async () => {
    try {
        await Exhibit.create(exhibits);
        console.log("Data imported");
        process.exit();
    } catch (err) {
        console.error(err);
    }
};


if (process.arg[2] === "-i") {
    importData().then();
} else {
    console.error(err);
}
   
