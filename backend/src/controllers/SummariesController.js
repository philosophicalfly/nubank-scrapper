const SummariesScrapper = require('../scrapper/Summaries');
const SummariesModel = require('../models/SummariesModel');

let {context} = require('./SessionController');

function index(req, res) {
    SummariesScrapper.getSummaries(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(err => {
        return res.status(400).json({err: 'Problem in getting summaries'})
    });
}

function store(req, res) {
    const summariesObj = req && req.body || null;
    if (!summariesObj) {        
        return res.status(400).json({err: 'Problem saving summaries'})
    }
    saveSummaries(summariesObj).then(() =>{
        return res.status(200).json();
    }).catch(err => {
        return res.status(400).json({err: 'Problem saving summaries'})
    });
}

function saveSummaries(summariesObj) {
    const mongoObj = convertObjToMongo(summariesObj);
    return new Promise((resolve, reject) => {
        SummariesModel.create(mongoObj).then(response => {
            console.log(response);
            return resolve(response);
        }).catch(err => {
            console.log(err);
            return reject(err);
        });
    });
}

function convertObjToMongo(bodyObj){
    const mongoObj = {
        tabs: [],
        summaries: []
    };
    for (let [k, v] of Object.entries(bodyObj.tabNames)) {
        mongoObj.tabs.push({k, v})
    }
    for (let [k, v] of Object.entries(bodyObj.summaries)) {
        mongoObj.summaries.push({k, v})
    }
    return mongoObj;
}

// tabs: [{
//     k: String,
//     v: String
// }],
// summaries: [{
//     k: String,
//     v: {
//         amount: String,
//         dueDate: String
//     }
// }]

module.exports = {
    index,
    store
}