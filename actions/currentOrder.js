'use strict';

const { DB, errHandler } = require('../db.js');
const { checkForActiveCustomer } = require('./helper.js');
const Table = require('cli-table');
const { red } = require('colors/safe');
const prompt = require('prompt');


const checkForCurrentOrder = () => {
  let userId = process.env.CURRENT_USER_ID;
  let userName = process.env.CURRENT_USER;
  // Check to make sure there is an active user
  if (!checkForActiveCustomer(userId)) {
    return;
  };

  // List all orders for active customer
  console.log(`\nAll orders for ${userName}\n`);
  displayCustomersOrderList();
};


const displayCustomersOrderList = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Get each customer order and display each
  DB.each(`select * from orders
    where customerId = ${userId}
  `, (err, { orderId, paymentStatus }) => {
    errHandler(err);

    // Display each order for the customer and its payment status
    console.log(`Order Id # ${orderId} - ${(paymentStatus == 1)?'PAID':'UNPAID'}`);

  }, (err, result) => {
    // If there are no orders
    if (result === 0) {
      console.log('\nPlease add some products to your order first.\n');
      return setTimeout(require('./menuOptions.js').startMenu, 1500);
    };

    // Prompt user for order view selection
    promptForOrderSelection();
  });
};


const promptForOrderSelection = () => {
  let q = require('../promptSchema/simple.js');
  console.log('');

  // Prompt user for order selection
  prompt.get(q, (err, { $ }) => {
    // If 0 return to startMenu
    if ($ == 0) {
      return setTimeout(require('./menuOptions.js').startMenu, 1000)
    };

    console.log('');
    // Get all order line items for selected order
    displayOrderLineItems($);
  });
};


const displayOrderLineItems = (orderId) => {
  let counter = 0;
  const t = createCliTable(`Order ID # ${orderId}`);
  t.push([red('Line ID'), red('Product Name'), red('Price')]);

  // Get each line item associate with the order
  DB.each(`select li.orderId as orderId, p.name as name, p.price as price
    from orderLineItems li, products p
    where li.orderId = ${orderId}
    and li.productId = p.productId
  `, (err, { name, price }) => {
    // Push each line item to cli table
    t.push([++counter, name, `$${price}`]);

  // Completion callback
  }, (err, result) => {
    // If there are no orders
    if (result === 0) {
      console.log('\nPlease add some products to your order first.\n');
      return setTimeout(require('./menuOptions.js').startMenu, 1500);
    };

    // Display orderline table
    console.log('');
    console.log(t.toString());
    // Prompt user for next step
    promptUserForNextDisplay();
  });
};


const promptUserForNextDisplay = () => {
  let q = require('../promptSchema/currentOrder.js');
  console.log('');

  // Prompt user for next choice
  prompt.get(q, (err, { $ }) => {
    // Return to main menu
    if ($ == 0) {
      setTimeout(require('./menuOptions.js').startMenu, 1000);
    // Display order list again
    } else if ($ == 1) {
      console.log('');
      displayCustomersOrderList();
    } else {
      console.log('\nInvalid choice. Please enter Order ID');
      displayCustomersOrderList();
    }
  });
};


const createCliTable = (header)=> {
  return new Table({
    head: ['', header, ''],
    colWidths: [10,18,15]
  })
};


module.exports = { checkForCurrentOrder };
