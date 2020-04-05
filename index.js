const puppeteer = require('puppeteer');
require('dotenv').config();

const LOGIN = process.env.NULOGIN;
const PASSWD = process.env.NUPASSWD;

(async () => {
    const browser = await puppeteer.launch({headless: false, defaultViewport: null});
    const page = await browser.newPage();
    
    async function login(){
        await page.goto('https://app.nubank.com.br/#/login', { waitUntil: 'networkidle0' });
        await page.type('#username', LOGIN);
        await page.type('input[type="password"]', PASSWD);
        await page.click('button[class="nu-button stroke login-btn ng-binding"]');
        await page.waitForSelector('img[alt="Scan me!"]');
        const imgAll = await page.$$eval('img[alt="Scan me!"]', images => {
            return images.map((image)=>image.src)
        });
        await console.log(imgAll[0]);
        await page.waitForSelector('a[href="#bills"]');
        return 0;
    }
    
    async function openAllTabs(){
        await page.goto('https://app.nubank.com.br/#/bills')
        await page.waitForSelector('.md-tab-content');
        let tabs = await page.evaluate(() => {
            let retObj = {};
            const rawTabs = document.querySelectorAll('.md-tab-themed');
            rawTabs.forEach(tab => {
                const monthId = tab.id;
                const monthName = tab.querySelector('.period').innerHTML
                retObj[monthId]=monthName;
            });
            return retObj
        });
        Object.keys(tabs).forEach((tab, i) => {
            setTimeout(async () => {
                await page.$eval(`#${tab}`, tab => tab.click());
            }, i * 50);
        });
        // console.log('openAllTabs -> tabs', tabs);
        return tabs;
    }    
    
    async function getSummaries(){
        await page.goto('https://app.nubank.com.br/#/bills')
        await page.waitForSelector('.md-tab-content');
        let summaries = await page.evaluate(() => {
            let retObj = {};
            const months = document.querySelectorAll('div[role="tabpanel"]');
            months.forEach(month => {
                const monthId = month.id.substr(month.id.length - 7);
                retObj[monthId]={};
                const summaries = month.querySelectorAll('.row .summary .amount-due .cell');
                summaries.forEach(summary => {
                    const amount = summary.querySelector('.amount').innerText
                    const dueDate = summary.querySelector('.due .date').innerText;
                    retObj[monthId]={
                        amount,
                        dueDate,
                    };   
                });
            });
            return retObj;
        });
        // console.log('getSummaries -> summaries', summaries);
        return summaries;
    }
    
    async function getCharges(){
        await page.goto('https://app.nubank.com.br/#/bills')
        await page.waitForSelector('.md-tab-content');
        let charges = await page.evaluate(() => {
            let retObj = {};
            const months = document.querySelectorAll('div[role="tabpanel"]');
            months.forEach(month => {
                const monthId = month.id.substr(month.id.length - 7);
                retObj[monthId]=[];
                const charges = month.querySelectorAll('.row .charges .charges-list .charge');
                charges.forEach(charge => {
                    const date = charge.querySelector('.charge .time .cell .date').innerText
                    const description = charge.querySelector('.charge-data .description').innerText;
                    const amount = charge.querySelector('.charge-data .amount').innerText;
                    retObj[monthId].push({
                        date,
                        description,
                        amount
                    });   
                });
            });
            return retObj;
        });
        // console.log('getCharges -> charges', charges);
        return charges;
    }
    
    async function getProfile(){
        await page.goto('https://app.nubank.com.br/#/profile', { waitUntil: 'networkidle0' })
        await page.waitForSelector('.card');
        const profile = await page.evaluate(() => {
            const name = document.querySelector('.card .name').innerText
            const email = document.querySelector('#email').value;
            const phone = document.querySelector('#phone').value;
            const number = document.querySelector('.card .number').innerText;
            const usedCredit = document.querySelector('.limitbar .open .amount').innerText
            const availableCredit = document.querySelector('.limitbar .available .amount').innerText
            const summary = document.querySelectorAll('.card-summary .value');
            const totalCredit = summary[0].innerText;
            const dueDay = summary[1].innerText;
            const retObj = {
                name,
                email,
                phone,
                number,
                usedCredit,
                availableCredit,
                totalCredit,
                dueDay
            };
            return retObj;
        });
        // console.log('getProfile -> profile', profile);
        return profile;
    }
    
    
    await login();
    // await openAllTabs();
    // await (new Promise(r => setTimeout(r, 1000)))
    // const summaries = await getSummaries();
    // const charges = await getCharges();
    // const profile = await getProfile();
    return 0;
    
})();