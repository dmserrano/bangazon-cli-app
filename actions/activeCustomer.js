'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');


// Display all customers
const showActiveCustomers = () => {
  console.log('');
  // Query the database for all customers
  DB.each(`select customerId, name from customers`, (err, { customerId, name}) => {
    errHandler(err);

    // If there are user(s) log each out to the console
      console.log(`${customerId}. ${name}`);

  // Completion callback
  }, (err, result) => {
    errHandler(err);

    // If no user has been created
    if (result == 0 ) {
      console.log(`\nPlease create a customer first.\n`);
      return setTimeout(require('./menuOptions.js').startMenu, 1500);
    };

    // Console.log for single line space
    console.log('');
    setActiveUser();
  });
};


// Creates the prompt to capture the active listener
const setActiveUser = () => {
  // Create schema for active user prompt
  let q = {name: '$', required: true, type: 'integer',
  description: 'Enter selection', message: 'Invalid response, numbers only'};

  // Capture input from user and query the db to get the user
  prompt.get(q, (err, { $ }) => {

    // Search for a specific user with user input
    DB.get(`select name from customers where customerId = ${$}`, (err, result) => {
      errHandler(err);

      // If no results return, no such user exists. Display users
      if (!result) {
        console.log('\nNo such user exists. Please select a valid user.\n');
        return setTimeout(showActiveCustomers, 1500);
      };

      // Store the current user on the process.env obj
      process.env.CURRENT_USER = result.name;
      process.env.CURRENT_USER_ID = $;

      // Require in startMenu method here to avoid circular dep
      setTimeout(require('./menuOptions.js').startMenu, 1500);
    });
  });
};

module.exports = { showActiveCustomers };
