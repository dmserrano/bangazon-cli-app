'use strict';

// Create schema for product prompt
module.exports = {
  name: '$',
  required: true,
  type: 'integer',
  description: 'Enter Order ID to view order | 0 to go back',
  message: 'Invalid response, numbers only'
};
