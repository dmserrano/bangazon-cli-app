'use strict';

const { DB, errHandler } = require('../db.js');
const customers = require('../json/customers.json');

module.exports = () => {
  customers.forEach(({name, address, city, state, postalCode, phoneNumber}) => {
    DB.run(`insert into customers values (
      null, "${name}", "${address}", "${city}",
      "${state}", "${postalCode}", "${phoneNumber}"
    )`, errHandler);
  });
};
