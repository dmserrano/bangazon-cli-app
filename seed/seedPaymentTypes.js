'use strict';

const { DB, errHandler } = require('../db.js');
const types = require('../json/types.json');

module.exports = () => {
  types.forEach(({ name, accountNumber }) => {
    DB.run(`insert into payment_options values (
      null, "${name.toUpperCase()}", "${accountNumber}"
    )`, errHandler);
  });
};
