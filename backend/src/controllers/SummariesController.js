/* eslint-disable no-mixed-operators */
const SummariesScrapper = require('../scrapper/Summaries');
const SummariesModel = require('../models/SummariesModel');

let { context } = require('./SessionController');

function index (req, res) {
    SummariesScrapper.getSummaries(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem in getting summaries' });
    });
}

function store (req, res) {
    const summariesObj = req && req.body || null;
    if (!summariesObj) {
        return res.status(400).json({ err: 'Problem saving summaries' });
    }
    saveSummaries(summariesObj).then(() => {
        return res.status(200).json();
    }).catch(() => {
        return res.status(400).json({ err: 'Problem saving summaries' });
    });
}

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
    index,
    store
};
