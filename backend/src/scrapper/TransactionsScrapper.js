const { getPage, prudentClick, dragAndDrop } = require('./Utils');

async function getTransactions (context) {
  const page = context.page || await getPage(context);
  await page.goto('https://app.nubank.com.br/#/transactions');
  await prudentClick(page, '#timeChart .header');
  await dragAndDrop(page, '.resize.w', '.axis.y');
  await dragAndDrop(page, '.resize.e', '.feed');
  await (new Promise(resolve => setTimeout(resolve, 1000)));

  const transactions = await page.evaluate(() => {
    const summaries = document.querySelectorAll('.summary .number-display');
    const purchases = summaries[0] ? summaries[0].innerText : '';
    const expenses = summaries[1] ? summaries[1].innerText : '';
    const retObj = {
      purchases,
      expenses,
      feed: []
    };

    const cards = document.querySelectorAll('#feedTable .event-card');

    cards.forEach(card => {
      const title = card.querySelector('.title') ? card.querySelector('.title').innerText : '';
      const description = card.querySelector('.description') ? card.querySelector('.description').innerText : '';
      const amount = card.querySelector('.amount') ? card.querySelector('.amount').innerText : '';
      const date = card.querySelector('.time') ? card.querySelector('.time').innerText : '';

      retObj.feed.push({
        title,
        description,
        amount,
        date
      });
    });
    return retObj;
  });

  context.data = transactions;
  return context;
}

module.exports = {
  getTransactions
};
