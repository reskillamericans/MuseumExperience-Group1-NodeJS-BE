const mongoose = require("mongoose");

const exhibitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: Array,
    videos: Array,
    audios: Array,
    category: {
        type: String,
        required: true,
    },
});

exports.ExhibitModel = mongoose.model("Exhibit", exhibitSchema);
