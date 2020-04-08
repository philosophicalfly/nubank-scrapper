const SummariesScrapper = require('../scrapper/Summaries');
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
    return res.status(200).json(context.data);
}

module.exports = {
    index,
    store
}