const mongoose = require('mongoose');
const { Schema } = mongoose;
const adminSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'email cannot be blank']
    },
    questions: [{
        type: Schema.Types.ObjectId, 
        ref: 'Question'
    }]
});
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin;