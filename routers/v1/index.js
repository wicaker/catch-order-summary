'use strict';
const express = require('express');
const v1 = express.Router();

const first = require('./first');

v1.use('/first', first);

module.exports = v1;
