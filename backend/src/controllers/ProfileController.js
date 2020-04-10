/* eslint-disable no-mixed-operators */
const ProfileScrapper = require('../scrapper/Profile');
const { saveProfile } = require('../modules/ProfileModule');
let { context } = require('./SessionController');

function index (req, res) {
    ProfileScrapper.getProfile(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem in getting profile' });
    });
}

function store (req, res) {
    const profileObj = req && req.body || null;
    if (!profileObj) {
        return res.status(400).json({ err: 'Problem saving profile' });
    }
    saveProfile(profileObj).then(() => {
        return res.status(200).json();
    }).catch(() => {
        return res.status(400).json({ err: 'Problem saving profile' });
    });
}

module.exports = {
    index,
    store
};
