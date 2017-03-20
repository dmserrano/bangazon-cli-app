'use strict';

const { DB, errHandler } = require('../db.js');

DB.run(`drop table customers`, errHandler)
  .run(`drop table paymentOptions`, errHandler)
  .run(`drop table orders`, errHandler)
  .run(`drop table products`, errHandler)
  .run(`drop table orderLineItems`, errHandler)
