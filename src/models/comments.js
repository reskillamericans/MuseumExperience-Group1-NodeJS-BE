const mongoose = require('mongoose');
const { Schema } = mongoose;

//comments schema
const commentSchema = new Schema({
    title: {
        type: String
    },
    description: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentSchema);