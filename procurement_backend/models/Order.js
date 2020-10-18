const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    item: {
        type : String,
        required : true
    },
    item_desc: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    total_cost: {
        type: Number
    },
    status: {
        type: String
    },
    priority: {
        type: Number,
        required: true
    },
    directOrder: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('orders', OrderSchema);