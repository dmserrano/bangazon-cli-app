'use strict';

const { DB, errHandler } = require('../db.js');
const prompt = require('prompt');
const list = require('../promptSchema/createCustomer.js');


const createCustomer = () => {
  console.log(`\nPlease enter the following information to create a new customer account.\n`);

  // Using prompt, ask the user the required fields
  prompt.get(list, (err, resultObj) => {
    console.log(`\nCustomer account for ${resultObj.Name} created!\n`);
    // Store the newly created customer as the currentUser
    process.env.CURRENT_USER = resultObj.Name;
    // Insert the new customer into the db
    insertCustomer(resultObj);
    // Require in startMenu method here to avoid circular dep
    setTimeout(require('./menuOptions.js').startMenu, 2000);
  })
};


// Insert the customer object into the db
const insertCustomer = ({ Name, Address, City, State, PostalCode, PhoneNumber }) => {
  DB.run(`insert into customers values (
    null, "${Name}", "${Address}",
    "${City}", "${State}",
    "${PostalCode}", "${PhoneNumber}"
  )`, errHandler)
  // returns 'Error: SQLITE_MISUSE: unknown error'
  // Use returned DB object to retrieve customer
  .run(``, (err) => setNewCustomerAsActive());
};


// Set newly create customer as active customer
const setNewCustomerAsActive = () => {
  let name = process.env.CURRENT_USER;

  // Select newly create customer from DB and set as active customer
  DB.get(`select * from customers where name = ${name}`, (err, { customerId }) => {
    process.env.CURRENT_USER_ID = customerId;
  });
};


module.exports = { createCustomer };
