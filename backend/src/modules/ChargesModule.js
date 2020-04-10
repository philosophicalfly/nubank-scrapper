const ChargesModel = require('../models/ChargesModel');

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
    saveCharges
};
