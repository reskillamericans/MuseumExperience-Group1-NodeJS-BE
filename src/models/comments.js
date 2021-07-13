const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//comments schema
const commentSchema = new mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Comment', commentSchema);