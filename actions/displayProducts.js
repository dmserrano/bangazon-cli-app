'use strict';

const { DB, errHandler } = require('../db.js');
const { checkForActiveCustomer } = require('./helper.js');
const prompt = require('prompt');


const getAllProducts = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Check to see if there is a current user
  if (!checkForActiveCustomer(userId)) {
    return;
  };

  console.log('\nSelect a poduct(s) to add to your order.\n');

  // Select all products from database to display
  DB.each(`select * from products`, (err, {productId, name, price}) => {
    errHandler(err);
    // Console log each products to console
    console.log(`${productId} DOMAIN: ${name}, PRICE: $${price}`);

  // Completion callback
  }, (err, result) => {
    console.log('');
    console.log('0 Back to main menu\n');
    addProductToOrder();
  });
};


const addProductToOrder = () => {
  // Create schema for product prompt
  let q = {name: '$', required: true, type: 'integer',
  description: 'Enter selection', message: 'Invalid response, numbers only'};

  // Prompt user for product selection
  prompt.get(q, (err, { $ }) => {

    // Back to main menu option
    if ($ == 0) {
      return require('./menuOptions.js').startMenu();
    };

    // Select the chosen product
    DB.get(`select * from products where productId = ${$}`,
      (err, result) => {
      errHandler(err);

      // Test for existing record in db
      if (!result) {
        console.log(`\nNo such item exists. Please enter valid item selection`);
        return setTimeout(getAllProducts, 1500);
      };

      // Insert and display chosen product
      insertAndDisplayProduct(result);

    });
  });
};


// Insert and display chosen product
const insertAndDisplayProduct = ({ productId, price }) => {
  let orderId = process.env.CURRENT_ORDER_ID;

  // Insert product to orderLineItems table with orderId
  DB.run(`insert into orderLineItems values (
    null, ${orderId}, ${productId}, ${price}
  )`, errHandler)
  // Query the product that was just added to the order
  .get(`select name from products where productId = ${productId}`, (err, {name}) => {
    errHandler(err);
    // Console log the add product to the console
    console.log(`\nProduct '${name}' was added to your order`);
    // Display all products after 1s
    setTimeout(getAllProducts, 1500);
  });
};


module.exports = { getAllProducts };
