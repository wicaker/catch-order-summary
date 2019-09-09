'use strict';
const express = require('express');
const v1 = express.Router();

const serveSummary = require('./serve-summary');

v1.use('/summary', serveSummary);

module.exports = v1;
