const mongoose = require('mongoose');

const ChargesSchema = new mongoose.Schema({
    tabs: [{
        k: String,
        v: String
    }],
    charges: [{
        k: String,
        v: [{
            date: String,
            description: String,
            amount: String
        }]
    }]
});

module.exports = mongoose.model('Charges', ChargesSchema);
