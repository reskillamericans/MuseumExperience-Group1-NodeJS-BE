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
});

exports.ExhibitModel = mongoose.model("Exhibit", exhibitSchema);
