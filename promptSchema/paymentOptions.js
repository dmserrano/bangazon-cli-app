'use strict';

module.exports = [
  // Defining schema for payment prompt
  { name: 'paymentType', required: true, type: 'string',
    message: 'Please enter a valid payment type',
    description: 'Enter payment type (e.g. AmEx, Visa, Checking)'
  },
  {
    name: 'accountNumber', required: true, type: 'string',
    message: 'Please enter a valid account number (e.g. 123-456-7890)',
    description: 'Enter account number'
  }
];
