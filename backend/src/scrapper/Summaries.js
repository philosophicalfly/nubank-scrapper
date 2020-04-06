const puppeteer = require('puppeteer');
const {getPage, getTabNames} = require('./Utils');

async function loadAllTabs(context){
    page = context.page || await getPage(context);
    context = await getTabNames(context);
    const tabs = context.data;

    Object.keys(tabs).forEach((tab, i) => {
        setTimeout(async () => {
            await page.$eval(`#${tab}`, tab => tab.click());
        }, i * 50);
    });
    // console.log('openAllTabs -> tabs', tabs);
    return context;
}    

async function getSummaries(context){
    context = await loadAllTabs(context);
    await (new Promise(r => setTimeout(r, 1500)))
    const tabNames = context.data;
    page = context.page || await getPage(context);
    await page.goto('https://app.nubank.com.br/#/bills')
    await page.waitForSelector('.md-tab-content');
    let summaries = await page.evaluate(() => {
        let retObj = {};
        const months = document.querySelectorAll('div[role="tabpanel"]');
        months.forEach(month => {
            const monthId = month.id ? month.id.substr(month.id.length - 7) : '';
            retObj[monthId]={};
            const summaries = month.querySelectorAll('.row .summary .amount-due .cell');
            summaries.forEach(summary => {
                const amount = summary.querySelector('.amount') ? summary.querySelector('.amount').innerText : '';
                const dueDate = summary.querySelector('.due .date') ? summary.querySelector('.due .date').innerText : '';
                retObj[monthId]={
                    amount,
                    dueDate,
                };   
            });
        });
        return retObj;
    });
    // console.log('getSummaries -> summaries', summaries);
    context.data = {
        tabNames,
        summaries
    }
    context.page = page
    return context;
}

module.exports = {
    getSummaries
}