const mongoose = require('mongoose');

const SummariesSchema = new mongoose.Schema({
    tabs: [{
        k: String,
        v: String
    }],
    summaries: [{
        k: String,
        v: {
            amount: String,
            dueDate: String
        }
    }]
});

module.exports = mongoose.model('Summaries', SummariesSchema);
