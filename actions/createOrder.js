'use strict';

const { DB, errHandler } = require('../db.js');
const { getAllProducts } = require('./displayProducts');
const { checkForActiveCustomer } = require('./helper.js');


const determineIfUnpaidOrder = () => {
  let userId = process.env.CURRENT_USER_ID;
  // Check to make sure there is an active user
  if (!checkForActiveCustomer(userId)) {
    return;
  };

  // Query to find unpaid orders for current customer
  DB.get(`select * from orders
    where customerId = ${userId}
    and paymentStatus = -1
  `, (err, result) => {
    errHandler(err);

    // If there is an unpaid order, return that order obj
    if (result) {
      getAllProducts();
      return process.env.CURRENT_ORDER_ID = result.orderId;
    };

    // If all orders are paid, create a new order for the customer
    createOrder();
  });

};


// Creates a new order for the acitve customer
const createOrder = () => {
    let userId = process.env.CURRENT_USER_ID;

    // Insert a new order with the current users id
    // and a payment value of false (not paid)
    DB.run(`insert into orders values (
      null, ${userId},
      null, -1
    )`, errHandler)
    // Query the order that was just inserted
    .get(`select * from orders
      where customerId = ${userId} and paymentStatus = -1
    `, (err, { orderId }) => {
      errHandler(err);
      // Set current order id
      process.env.CURRENT_ORDER_ID = orderId;
      // Make sure to call getAllProducts after the current orderId has been set
      getAllProducts();
    });
};


module.exports = { determineIfUnpaidOrder };
