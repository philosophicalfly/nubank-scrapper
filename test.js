const {getProfile} = require('./src/scrapper/Profile');
const {getTransactions} = require('./src/scrapper/Transactions');
const {getSummaries} = require('./src/scrapper/Summaries');
const {getCharges} = require('./src/scrapper/Charges');
const {login, logout} = require('./src/scrapper/Authentication');

(async () => {

    let context = {
        page: false,
        browser: false,
        logged: false,
        data: false
    };

    context = await login(context);
    context = await getSummaries(context), console.log(context.data);
    context = await getCharges(context), console.log(context.data);
    context = await getProfile(context), console.log(context.data);
    context = await getTransactions(context), console.log(context.data);
    context = await logout(context);
    return 0;
})();