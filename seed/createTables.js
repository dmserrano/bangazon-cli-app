'use strict';

const { DB, errHandler } = require('../db.js');

DB.run(`create table if not exists customers
  (customerId INTEGER PRIMARY KEY,
  name TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  postalCode INT,
  phoneNumber INT)
`, errHandler)
.run(`create table if not exists paymentOptions
  (paymentOptionId INTEGER PRIMARY KEY,
  customerId INT,
  name TEXT,
  accountNumber INT,
  FOREIGN KEY(customerId) references customers(customerId))
`, errHandler)
.run(`create table if not exists orders
  (orderId INTEGER PRIMARY KEY,
  customerId INT,
  paymentOptionId INT,
  paymentStatus INT,
  FOREIGN KEY(customerId) references customers(customerId),
  FOREIGN KEY(paymentOptionId) references paymentOptions(paymentOptionId))
`, errHandler)
.run(`create table if not exists products
  (productId INTEGER PRIMARY KEY,
  name TEXT,
  price INT)
  `, errHandler)
.run(`create table if not exists orderLineItems
  (orderLineItemsId INTEGER PRIMARY KEY,
  orderId INT,
  productId INT,
  price INT,
  FOREIGN KEY(orderId) references orders(orderId),
  FOREIGN KEY(productId) references products(productId))
`, errHandler);
