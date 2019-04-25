const pdfTemplate = require('../utils/html_to_pdf/template/fop_invoice');
const pdf = require('html-pdf');
const mail = require('../utils/mailSender');

exports.generateFopInvoice = () => new Promise(async (resolve, reject) => {
  //pdf.create(pdfTemplate);
  resolve({
    result: true,
    data: pdf.create(pdfTemplate())
  })
  //await mail.mailSend(mail.sendWithAttachments);
});
