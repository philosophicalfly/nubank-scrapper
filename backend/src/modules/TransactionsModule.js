const TransactionsModel = require('../models/TransactionsModel');

function saveTransactions (transactionsObj) {
    return new Promise((resolve, reject) => {
        TransactionsModel.create(transactionsObj).then(response => {
            return resolve(response);
        }).catch(err => {
            console.log(err);
            return reject(err);
        });
    });
}

module.exports = {
    saveTransactions
};
