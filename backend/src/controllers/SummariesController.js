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

module.exports = {
    index
}