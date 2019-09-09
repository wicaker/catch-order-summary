'use strict';
const express = require('express');
const serveSummary = express.Router();
const summaryService = require('../../services/v1/serve-summary.service');

serveSummary.get('/', (req, res) => {
  summaryService.getAll(req, res);
});

serveSummary.get('/csvfile', (req, res) => {
  summaryService.fileCsv(req, res);
});

serveSummary.post('/sendfile', (req, res) => {
  summaryService.sendEmail(req, res);
});


module.exports = serveSummary;
