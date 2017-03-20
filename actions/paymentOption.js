'use strict';

const { DB, errHandler } = require('../db.js');
const { checkForActiveCustomer } = require('./helper.js');
const prompt = require('prompt');
const list = require('../promptSchema/paymentOptions.js');


// Prompt user for payment info
const getPaymentOptions = () => {
  let userId = process.env.CURRENT_USER_ID;

  // Determine if there is an active user
  if (!checkForActiveCustomer(userId)) {
    return;
  };

  // If active user, begin prompt
  console.log(`\nPlease enter the following information.\n`);
  prompt.get(list, (err, resultObj) => {
    setPaymentOptions(resultObj);
  });

};


// Get customerId and insert paymentOptions
const setPaymentOptions = ({ paymentType, accountNumber }) => {
  let userId = process.env.CURRENT_USER_ID;

  // Query the database for the active customers customerId
  DB.get(`select customerId from customers where customerId = "${userId}"`, (err, { customerId }) => {
    errHandler(err);
    // Insert paymentOption info into DB
    DB.run(`insert into paymentOptions values
      (null, ${customerId}, "${paymentType.toUpperCase()}", "${accountNumber}")`, errHandler);

    console.log(`\nA ${paymentType} Payment Option has been saved to your account.\n`);
    // Navigate to startMenu
    setTimeout(require('./menuOptions.js').startMenu, 2000);
  });
};


module.exports = { getPaymentOptions };
