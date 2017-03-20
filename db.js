'use strict';

const { Database } = require('sqlite3').verbose();

const DB = new Database('bangazon.sqlite');
const errHandler = (err) => (err) ? console.log(err.toString()) : false;

module.exports = { DB, errHandler };
