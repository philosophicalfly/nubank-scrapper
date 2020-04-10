/* eslint-disable no-mixed-operators */
const ChargesScrapper = require('../scrapper/Charges');
const { saveCharges } = require('../modules/ChargesModule.js');
let { context } = require('./SessionController');

function index (req, res) {
    ChargesScrapper.getCharges(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem in getting charges' });
    });
}

function store (req, res) {
    const chargesObj = req && req.body || null;
    if (!chargesObj) {
        return res.status(400).json({ err: 'Problem saving charges' });
    }
    saveCharges(chargesObj).then(() => {
        return res.status(200).json();
    }).catch(() => {
        return res.status(400).json({ err: 'Problem saving charges' });
    });
}

module.exports = {
    index,
    store
};
