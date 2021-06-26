const mongoose = require('mongoose');
const { Schema } = mongoose;
//Questions Schema
const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title required']
  },
  description: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  answer: String,
  status: {
    type: String,
    enum: ['pending', 'answered', 'published'],
    default: pending
  }
});

//model
const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
