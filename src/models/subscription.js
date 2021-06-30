const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    exhibitId: {
        type: Schema.Types.ObjectId,
        ref: 'Exhibit'
    },
    status: {
        type: String,
        enum:['active', 'cancelled']
    }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);