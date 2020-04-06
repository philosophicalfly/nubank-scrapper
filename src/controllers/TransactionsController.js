const TransactionsScrapper = require('../scrapper/Transactions');
let {context} = require('./SessionController');

function index(req, res) {
    TransactionsScrapper.getTransactions(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(err => {
        return res.status(400).json({err: 'Problem in getting transactions'})
    });
}

module.exports = {
    index
}