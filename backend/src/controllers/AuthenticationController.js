const AuthenticationScrapper = require('../scrapper/AuthenticationScrapper');
const { decrypt } = require('../scrapper/Utils');
let { context } = require('./SessionController');

async function getQrCode (req, res) {
    const body = req.body;
    context.login = await decrypt(body.login);
    context.passwd = await decrypt(body.passwd);
    AuthenticationScrapper.getQrCode(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem getting QR' });
    });
}

function watchLogin (req, res) {
    AuthenticationScrapper.watchLogin(context).then(response => {
        context = response;
        return res.json(context.data);
    }).catch(() => {
        context.login = false;
        context.passwd = false;
        return res.status(400).json({ err: 'Problem in login' });
    });
}

function logout (req, res) {
    AuthenticationScrapper.logout(context).then(response => {
        context = response;
        context.login = false;
        context.passwd = false;
        return res.json(context.data);
    }).catch(() => {
        return res.status(400).json({ err: 'Problem in logout' });
    });
}

module.exports = {
    getQrCode,
    watchLogin,
    logout
};
