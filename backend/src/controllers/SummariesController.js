/* eslint-disable no-mixed-operators */
const SummariesScrapper = require('../scrapper/SummariesScrapper');
const { getPermissions } = require('../modules/CommonModule');
const { saveSummaries } = require('../modules/SummariesModule');
let { context } = require('./SessionController');

async function index (req, res) {
    const userHasPermissions = await getPermissions(req);
    if (!userHasPermissions) {
        return res.status(401).json({ err: 'Unauthorized' });
    };
    SummariesScrapper.getSummaries(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem in getting summaries' });
    });
}

async function store (req, res) {
    const userHasPermissions = await getPermissions(req);
    if (!userHasPermissions) {
        return res.status(401).json({ err: 'Unauthorized' });
    };
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

module.exports = {
    index,
    store
};
