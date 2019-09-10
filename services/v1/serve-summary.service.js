const db = require('../../database/models');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.NODEMAILER_GMAIL_EMAIL, // generated ethereal user
    pass: process.env.NODEMAILER_GMAIL_PASSWORD, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const summaryService = {
  getAll: async(req, res) => {
    try {
      const summary = await db.order_summary.findAll();
      return res
        .status(200)
        .json({ data: summary });
    } catch (error) {
      if (error.errors) {
        return res.status(500).json({ error: error.errors });
      }
      return res.status(500).json({ error: error.message });
    };
  },
  sendEmail: async(req, res) => {
    try {
      let mailOptionsToCustomer = {
        from: `'Wicaker.Com' <${process.env.NODEMAILER_EMAIL_SENDER}>`, // sender address
        to: req.body.data.email, // list of receivers
        subject: `Report Summary Order`, // Subject line
        text: 'Report Summary Order', // plain text body
        html: `<div>Hai ${req.body.data.email}</div>
        <div>This is summary of order. Open the file in this link below.</div>
        <div><a href='${process.env.DOMAIN_NAME}/api/v1/summary/csvfile' target='_blank'>Summary Report</a></div>
        `, // html body
      };

      await transporter.sendMail(mailOptionsToCustomer);

      return res.status(200).json({ message: 'Summary Successfully Sent !' });
    } catch (error) {
      if (error.errors) {
        return res.status(500).json({ error: error.errors });
      }
      return res.status(500).json({ error: error.message });
    };
  },
  fileCsv: async(req, res) => {
    try {
      const fs = require('fs');
      const filePath = 'documents/out.csv'; // or any file format
      fs.exists(filePath, function(exists) {
        if (exists) {
          // Content-type is very interesting part that guarantee that
          // Web browser will handle response in an appropriate manner.
          res.setHeader('Content-disposition', 'attachment; filename=summary-order.csv');
          res.set('Content-Type', 'text/csv');
          fs.createReadStream(filePath).pipe(res);
        } else {
          return res.status(400).json({ error: 'File not found' });
        };
      });
    } catch (error) {
      if (error.errors) {
        return res.status(500).json({ error: error.errors });
      }
      return res.status(500).json({ error: error.message });
    };
  },
};

module.exports = summaryService;
