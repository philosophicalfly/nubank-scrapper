const { decrypt } = require('../scrapper/Utils');
const { context } = require('../controllers/SessionController');

async function getPermissions (req) {
    if (req && req.headers && typeof req.headers.login === "string" && typeof req.headers.passwd === "string") {
        try {
            const login = await decrypt(req.headers.login);
            const passwd = await decrypt(req.headers.passwd);
            if (context.login === login && context.passwd === passwd) {
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
