const pdfTemplate = require('../utils/html_to_pdf/template/fop_invoice');
const pdf = require('html-pdf');
const mail = require('../utils/mailSender');
const fs = require('fs');

exports.generateFopInvoice = () =>
  new Promise(async (resolve, reject) => {
    try {
      const template = pdfTemplate();
      await pdf.create(template).toFile(`${__dirname}/result.pdf`, err => {
        if (err) {
          reject({
            result: false,
            code: 401,
            message: err,
          });
        }
        mail.mailSend(mail.sendWithAttachments(`${__dirname}/result.pdf`));
      });

      resolve({
        result: true,
        data: 'ok',
      });
    } catch (err) {
      reject({
        result: false,
        code: 402,
        message: err,
      });
    }
  });
