'use strict';

const { red } = require('colors/safe');

const createMenu = (user) => ([
  '',
  `${(user) ? `Welcome ${user}! What would you like to do?\n` : '' }`,
  '1. Create a customer account',
  '2. Choose active customer',
  '3. Create a payment option',
  '4. Add product to shopping cart',
  '5. Display all orders',
  '6. Complete an order',
  '7. See product popularity',
  '8. Leave Bangazon',
  '',
  `Please enter your selection (numbers only).`,
  ''
]);


const cascadeMenu = () => {
  let userName = process.env.CURRENT_USER;

  return new Promise((res, rej) => {
    // Pass in user name each time for cascade
    let menu = createMenu(userName);
    menu.forEach((each, i) => {
      setTimeout(() => {
        // Only resolve once menu has been fully iterated through
        console.log(each);
        ((i + 1) === menu.length) ? res(): false;
      }, (i * 100));
    })
  });
};

module.exports = { cascadeMenu };
