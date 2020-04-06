const puppeteer = require('puppeteer');
const {getBrowser, getPage} = require('./Utils');

require('dotenv').config();
// const LOGIN = process.env.NULOGIN;
// const PASSWD = process.env.NUPASSWD;

async function getQrCode(context){
    context.browser = context.browser || await getBrowser(context)
    page = context.page || await getPage(context)
    await page.goto('https://app.nubank.com.br/#/login', { waitUntil: 'networkidle0' });
    await page.type('#username', context.login);
    await page.type('input[type="password"]', context.passwd);
    await page.click('button[class="nu-button stroke login-btn ng-binding"]');
    await page.waitForSelector('img[alt="Scan me!"]');
    const imgAll = await page.$$eval('img[alt="Scan me!"]', images => {
        return images.map((image)=>image.src)
    });
    const qrCode = imgAll[0] || '';

    context.page = page
    context.logged = false;
    context.data = qrCode;
    return context;
}

async function watchLogin(context){
    page = context.page || await getPage(context)
    await page.waitForSelector('.nu-sprite-logo');

    context.page = page
    context.logged = true;
    context.data = {login: true};
    return context
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
        await context.browser.close();

        context.logged = false;
        context.page = false;
        context.browser = false;
        context.data = {login: false};
        return context;
    } catch (error) {
        return -1   
    }
}

module.exports = {
    getQrCode,
    watchLogin,
    logout
}