const mongoose = require('mongoose');

const TransactionsSchema = new mongoose.Schema({
    purchases: String,
    expenses: String,
    feed: [{
        title: String,
        descriprion: String,
        amount: String,
        date: String
    }]
});

module.exports = mongoose.model('Transactions', TransactionsSchema);
