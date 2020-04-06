const AuthenticationScrapper = require('../scrapper/Authentication');
let {context} = require('./SessionController');

function getQrCode(req, res) {
    const body = req.body;
    context.login = body.login;
    context.passwd = body.passwd;
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