'use strict';
const express = require('express');
const serveSummary = express.Router();
const summaryService = require('../../services/v1/serve-summary.service');

serveSummary.get('/', (req, res) => {
  if (!req.isAuth){
    return res.status(403).json({ error: 'You are not allowed !' });
  }
  summaryService.getAll(req, res);
});

serveSummary.get('/csvfile', (req, res) => {
  if (!req.isAuth){
    return res.status(403).json({ error: 'You are not allowed !' });
  }
  summaryService.fileCsv(req, res);
});

serveSummary.post('/sendfile', (req, res) => {
  if (!req.isAuth){
    return res.status(403).json({ error: 'You are not allowed !' });
  }
  summaryService.sendEmail(req, res);
});


module.exports = serveSummary;
