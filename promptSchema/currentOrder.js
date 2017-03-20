'use strict';

// Create schema for current order prompt
module.exports = {
  name: '$',
  required: true,
  type: 'integer',
  description: '0 for main menu | 1 to go back',
  message: 'Invalid response, numbers only'
};
