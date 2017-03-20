'use strict';

module.exports = [
  { name: 'Name', required: true,
    message: 'Oops, please enter a full name',
    description: 'Please enter the customers full name'
  },
  {
    name: 'Address', required: true,
    message: 'Oops, please enter a street address',
    description: 'Enter customers street address'
  },
  {
    name: 'City', required: true,
    message: 'Oops, please enter a city',
    description: 'Enter customers city'
  },
  {
    name: 'State', required: true,
    message: 'Oops, please enter a state',
    description: 'Enter customers state (e.g TN)'
  },
  {
    name: 'PostalCode', required: true,
    message: 'Oops, please enter a valid postal code',
    description: 'Enter customers postal code (e.g 37201)'
  },
  {
    name: 'PhoneNumber', required: true,
    message: 'Oops, please enter a valid phone number',
    description: 'Enter customers phone number (e.g 615-867-5309)'
  }
];
