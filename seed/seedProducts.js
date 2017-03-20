'use strict';

const { DB, errHandler } = require('../db.js');
const products = require('../json/products');

module.exports = () => {
  products.forEach(({ price, name }) => {
    DB.run(`insert into products values (
      null, "${name}", "${price}"
    )`, errHandler);
    });
};
