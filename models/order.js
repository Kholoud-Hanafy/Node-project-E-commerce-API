const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
