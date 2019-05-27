const pdfTemplate = require('../utils/html_to_pdf/template/fop_invoice');
//const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const mail = require('../utils/mailSender');
const fs = require('fs');

exports.generateFopInvoice = () =>
  new Promise(async (resolve, reject) => {
    try {

      const myTemplate = pdfTemplate();
      const browser = await puppeteer.launch({
        headless: true,  // language is not supported
        args: ['--lang=uk-UK, uk']
      });
      const page = await browser.newPage();

      // not implement specific language
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'ru-RU, uk-UK',
        'Accept-Charset': 'utf-8',
        'Content-Type': 'text/html; charset=utf-8',
      });
      await page.setContent(myTemplate, 'utf8');
      await page.emulateMedia('screen');
      await page.pdf({
        path: `${__dirname}/result.pdf`,
        format: 'A4',
        printBackground: true,
      });
      console.log('done');

      await browser.close();

      resolve({
        result: true,
        data: 'ok',
        //message: myTemplate,
      });
    } catch (err) {
      reject({
        result: false,
        code: 402,
        message: err,
      });
    }
  });
