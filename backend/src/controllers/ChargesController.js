/* eslint-disable no-mixed-operators */
const ChargesScrapper = require('../scrapper/Charges');
const ChargesModel = require('../models/ChargesModel');
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

function saveCharges (charges) {
    const mongoObj = convertObjToMongo(charges);
    return new Promise((resolve, reject) => {
        ChargesModel.create(mongoObj).then(response => {
            return resolve(response);
        }).catch(err => {
            console.log(err);
            return reject(err);
        });
    });
}

function convertObjToMongo (bodyObj) {
    const mongoObj = {
        tabs: [],
        charges: []
    };
    if (bodyObj.tabNames) {
        for (const [k, v] of Object.entries(bodyObj.tabNames)) {
            k && v && mongoObj.tabs.push({ k, v });
        }
    }
    if (bodyObj.charges) {
        for (const [k, v] of Object.entries(bodyObj.charges)) {
            k && v && mongoObj.charges.push({ k, v });
        }
    }
    return mongoObj;
}

module.exports = {
    index,
    store
};
