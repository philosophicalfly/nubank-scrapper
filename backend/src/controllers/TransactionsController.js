/* eslint-disable no-mixed-operators */
const TransactionsScrapper = require('../scrapper/Transactions');
const { saveTransactions } = require('../modules/TransactionsModule');
let { context } = require('./SessionController');

function index (req, res) {
    TransactionsScrapper.getTransactions(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem in getting transactions' });
    });
}

function store (req, res) {
    const transactionsObj = req && req.body || null;
    if (!transactionsObj) {
        return res.status(400).json({ err: 'Problem saving profile' });
    }
    saveTransactions(transactionsObj).then(() => {
        return res.status(200).json();
    }).catch(() => {
        return res.status(400).json({ err: 'Problem saving profile' });
    });
}

module.exports = {
    index,
    store
};
