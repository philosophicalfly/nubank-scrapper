const puppeteer = require('puppeteer');
const {getBrowser, getPage} = require('./Utils');

require('dotenv').config();
const LOGIN = process.env.NULOGIN;
const PASSWD = process.env.NUPASSWD;

async function login(context){
    context.browser = context.browser || await getBrowser(context)
    page = context.page || await getPage(context)
    await page.goto('https://app.nubank.com.br/#/login', { waitUntil: 'networkidle0' });
    await page.type('#username', LOGIN);
    await page.type('input[type="password"]', PASSWD);
    await page.click('button[class="nu-button stroke login-btn ng-binding"]');
    await page.waitForSelector('img[alt="Scan me!"]');
    const imgAll = await page.$$eval('img[alt="Scan me!"]', images => {
        return images.map((image)=>image.src)
    });
    // await console.log(imgAll[0]);
    await page.waitForSelector('a[href="#bills"]');
    context.page = page
    context.logged = true;
    return context;
}

async function logout(context){
    context.page = context.page || await getPage(context)
    try {
        await page.goto('https://app.nubank.com.br/#/profile', { waitUntil: 'networkidle0' })
        await page.evaluate(() => {
            document.querySelector('.logout').click() 
        });
        await page.waitForSelector('.toolbar.login');
        // await console.log('Logged out');
        context.logged = false;
        context.data = false;
        await context.browser.close();
        return context;
    } catch (error) {
        return -1   
    }
}

module.exports = {
    login,
    logout
}