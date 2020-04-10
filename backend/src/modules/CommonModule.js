const { decrypt } = require('../scrapper/Utils');
const { context } = require('../controllers/SessionController');

async function getPermissions (req) {
    if (req && req.headers && typeof req.headers.login === "string" && typeof req.headers.passwd === "string") {
        try {
            const login = await decrypt(req.headers.login);
            const passwd = await decrypt(req.headers.passwd);
            console.log('getPermissions -> login', login);
            console.log('getPermissions -> context.login', context.login);
            console.log('getPermissions -> passwd', passwd);
            console.log('getPermissions -> context.passwd', context.passwd);
            if (context.login === login && context.passwd === passwd) {
                console.log('has');
                return true;
            }
        } catch (error) {
            return false;
        }
    }
    return false;
}

module.exports = {
    getPermissions
};
