const ProfileScrapper = require('../scrapper/Profile');
let {context} = require('./SessionController');

function index(req, res) {
    ProfileScrapper.getProfile(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(err => {
        return res.status(400).json({err: 'Problem in getting profile'})
    });
}

module.exports = {
    index
}