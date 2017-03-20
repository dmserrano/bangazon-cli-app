'use strict';


// Check if there is currently an active customer
const checkForActiveCustomer = (customerId) => {
  if (customerId == 0) {
    console.log(`\nPlease create or choose a customer.`);
    setTimeout(require('./menuOptions.js').startMenu, 1500);
    return false;
  };
  return true;
};


module.exports = { checkForActiveCustomer };
