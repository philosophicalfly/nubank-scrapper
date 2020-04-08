const TransactionsScrapper = require('../scrapper/Transactions');
const TransactionsModel = require('../models/TransactionsModel');
let {context} = require('./SessionController');

function index(req, res) {
    TransactionsScrapper.getTransactions(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(err => {
        return res.status(400).json({err: 'Problem in getting transactions'})
    });
}

function store(req, res) {
    console.log('store -> req.body', req.body);
    const transactionsObj = req && req.body || null;
    if (!transactionsObj) {        
        return res.status(400).json({err: 'Problem saving profile'})
    }
    saveProfile(transactionsObj).then(() =>{
        return res.status(200).json();
    }).catch(err => {
        return res.status(400).json({err: 'Problem saving profile'})
    });
}

function saveProfile(transactionsObj) {
    return new Promise((resolve, reject) => {
        TransactionsModel.create(transactionsObj).then(response => {
            console.log(response);
            return resolve(response);
        }).catch(err => {
            console.log(err);
            return reject(err);
        });
    });
}

module.exports = {
    index,
    store
}