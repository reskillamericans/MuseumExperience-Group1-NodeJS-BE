const mongoose = require('mongoose');
const { Schema } = mongoose;
const exhibitSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        lowercase: true
    },
    media: {
        string: [String]
    }
});

module.exports = mongoose.model('Exhibit', exhibitSchema)