/* eslint-disable no-mixed-operators */
const ProfileScrapper = require('../scrapper/ProfileScrapper');
const { saveProfile } = require('../modules/ProfileModule');
const { getPermissions } = require('../modules/CommonModule');
let { context } = require('./SessionController');

async function index (req, res) {
    const userHasPermissions = await getPermissions(req);
    if (!userHasPermissions) {
        return res.status(401).json({ err: 'Unauthorized' });
    };
    ProfileScrapper.getProfile(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem in getting profile' });
    });
}

async function store (req, res) {
    const userHasPermissions = await getPermissions(req);
    if (!userHasPermissions) {
        return res.status(401).json({ err: 'Unauthorized' });
    };
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
