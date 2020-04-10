const SummariesModel = require('../models/SummariesModel');

function saveSummaries (summariesObj) {
    const mongoObj = convertObjToMongo(summariesObj);
    return new Promise((resolve, reject) => {
        SummariesModel.create(mongoObj).then(response => {
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
        summaries: []
    };
    if (bodyObj.tabNames) {
        for (const [k, v] of Object.entries(bodyObj.tabNames)) {
            k && v && mongoObj.tabs.push({ k, v });
        }
    }
    if (bodyObj.summaries) {
        for (const [k, v] of Object.entries(bodyObj.summaries)) {
            k && v && mongoObj.summaries.push({ k, v });
        }
        return mongoObj;
    }
}

module.exports = {
    saveSummaries
};
