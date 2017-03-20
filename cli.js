'use strict';

const { startMenu } = require('./actions/menuOptions.js');
const { green } = require('colors/safe');

// Display menu and call prompt
console.log(green(`
*********************************************************
**  Welcome to Bangazon! Command Line Ordering System  **
*********************************************************`));

startMenu();
