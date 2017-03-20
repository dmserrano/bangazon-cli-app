'use strict';

const { DB, errHandler } = require('../db.js');
const Table = require('cli-table');
const prompt = require('prompt');
const { red } = require('colors/safe');

const displayPopList = () => {
  // Create new Table
  const t = new Table({
      head: ['Products', 'Orders', 'Customers', 'Revenue']
    , colWidths: [18, 11, 11, 15]
  });

  let orderSum = [], customerSum = [], revenueSum = [];

  // Select productId, productName, orderTotal, customerTotal, and revenueTotal
  // for each product.
  // If two products have equal Totals, revenueTotal will be the deciding factor in
  // the order by
  DB.each(`
    select p.productId, p.name,
    count(li.orderId) as orderTotal,
    count(distinct o.customerId) as customerTotal,
    sum(li.price) as revenue
    from products p
    left join orderLineItems li
    on p.productId = li.productId
    left join orders o
    on o.orderId = li.orderId
    group by p.productId
    order by orderTotal desc, revenue desc
  `, (err, { productId, name, orderTotal, customerTotal, revenue }) => {
    errHandler(err);

    // Set revenue to $0.00 if value is null
    revenue = revenue ?`$${revenue}`:'$0.00';

    // Push each value to sum arrays to calculate totals
    orderSum.push(orderTotal);
    customerSum.push(customerTotal);
    revenueSum.push(revenue);

    // Push each result to the pop table
    t.push([name, orderTotal, customerTotal, revenue]);

  // Completion callback
}, (err, result) => {
    errHandler(err);
    // Create an object of the sumArrays and table array to pass to reduce function
    let sumArrayObj = { t, orderSum, customerSum, revenueSum };
    reduceAndPushTotalsToTable(sumArrayObj);
  });
};


// Reduce each array of value totals and push them to the table array
const reduceAndPushTotalsToTable = (sumArrayObj) => {
  let { t, orderSum, customerSum, revenueSum } = sumArrayObj;
  // Reduce each of the sum arrays
  orderSum = orderSum.reduce((a,b) => a + b);
  customerSum = customerSum.reduce((a,b) => a + b);
  revenueSum = revenueSum.map(each => Number(each.split('$')[1]))
  .reduce((a,b) => a + b);

  // Push each category sum to the table and display
  t.push([red('Totals:'), red(orderSum), red(customerSum), red(`$${revenueSum.toFixed(2)}`)]);
  console.log(t.toString() + '\n');

  // Open prompt
  openPopPrompt();
};


// Prompt for user to navigate back to main menu
const openPopPrompt = () => {
  prompt.get({name: '$', description: '0 for main menu'}, (err, { $ }) => {
    if ($ == 0) {
      return require('./menuOptions.js').startMenu();
    };
    openPopPrompt();
  });
};


module.exports = { displayPopList };
