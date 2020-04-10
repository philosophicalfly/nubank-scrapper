const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    number: String,
    usedCredit: String,
    availableCredit: String,
    totalCredit: String,
    dueDay: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
