const AuthenticationScrapper = require('../scrapper/Authentication');
const {decrypt} = require('../scrapper/Utils')
let {context} = require('./SessionController');

async function getQrCode(req, res) {
    const body = req.body;
    context.login = await decrypt(body.login);
    console.log('getQrCode -> context.login', context.login);
    context.passwd = await decrypt(body.passwd);
    console.log('getQrCode -> context.passwd', context.passwd);

    AuthenticationScrapper.getQrCode(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(err => {
        return res.status(400).json({err: 'Problem getting QR'})
    });
}

function watchLogin(req, res) {
    AuthenticationScrapper.watchLogin(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(err => {
        return res.status(400).json({err: 'Problem in login'})
    });
}

function logout(req, res) {
    AuthenticationScrapper.logout(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(err => {
        return res.status(400).json({err: 'Problem in logout'})
    });
}

module.exports = {
    getQrCode,
    watchLogin,
    logout
}