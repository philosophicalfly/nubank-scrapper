const { getPage } = require('./Utils');

async function getProfile (context) {
    const page = context.page || await getPage(context);
    await page.goto('https://app.nubank.com.br/#/profile', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.card');
    const profile = await page.evaluate(() => {
        const name = document.querySelector('.card .name') ? document.querySelector('.card .name').innerText : '';
        const email = document.querySelector('#email') ? document.querySelector('#email').value : '';
        const phone = document.querySelector('#phone') ? document.querySelector('#phone').value : '';
        const number = document.querySelector('.card .number') ? document.querySelector('.card .number').innerText : '';
        const usedCredit = document.querySelector('.limitbar .open .amount') ? document.querySelector('.limitbar .open .amount').innerText : '';
        const availableCredit = document.querySelector('.limitbar .available .amount') ? document.querySelector('.limitbar .available .amount').innerText : '';
        const summary = document.querySelectorAll('.card-summary .value');
        const totalCredit = summary[0] ? summary[0].innerText : '';
        const dueDay = summary[1] ? summary[1].innerText : '';
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
    context.data = profile;
    context.page = page;
    return context;
}

module.exports = {
    getProfile
};
