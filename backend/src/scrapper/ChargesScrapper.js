const { getPage, loadAllTabs } = require('./Utils');

async function getCharges (context) {
    const page = context.page || await getPage(context);
    context = await loadAllTabs(context);
    const tabNames = context.data;
    const charges = await page.evaluate(() => {
        const retObj = {};
        const months = document.querySelectorAll('div[role="tabpanel"]');
        months.forEach(month => {
            const monthId = month.id ? month.id.substr(month.id.length - 7) : '';
            retObj[monthId] = [];
            const charges = month.querySelectorAll('.row .charges .charges-list .charge');
            charges.forEach(charge => {
                const date = charge.querySelector('.charge .time .cell .date') ? charge.querySelector('.charge .time .cell .date').innerText : '';
                const description = charge.querySelector('.charge-data .description') ? charge.querySelector('.charge-data .description').innerText : '';
                const amount = charge.querySelector('.charge-data .amount') ? charge.querySelector('.charge-data .amount').innerText : '';
                retObj[monthId].push({
                    date,
                    description,
                    amount
                });
            });
        });
        return retObj;
    });

    context.data = {
        tabNames,
        charges
    };
    return context;
}

module.exports = {
    getCharges
};
