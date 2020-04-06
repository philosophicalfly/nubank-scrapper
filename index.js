const puppeteer = require('puppeteer');
require('dotenv').config();
const {getProfile} = require('./scrapper/Profile');
const {getTransactions} = require('./scrapper/Transactions');
const {getSummaries} = require('./scrapper/Summaries');
const {getCharges} = require('./scrapper/Charges');
const {login, logout} = require('./scrapper/Authentication');
const Utils = require('./scrapper/Utils');

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