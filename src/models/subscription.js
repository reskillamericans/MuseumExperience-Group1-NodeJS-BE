const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    exhibit: { type: Schema.Types.ObjectId, ref: 'Exhibit' },
    status: {
        type: String,
        enum:['active', 'cancelled'],
        default: 'active'
    }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);