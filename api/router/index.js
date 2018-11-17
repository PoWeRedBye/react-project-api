const Router = require('koa-router');
const router = new Router();

const Parts = require('../parts/parts_api');
const ContractPrinter = require('../printers/printers_api');
const Printer = require('../printers/printers_api');

router.post('/addParts', async (ctx) => {
   try {
        const result = await Parts.addParts({...ctx.request.body});
        ctx.body = result;
   } catch (err) {
       console.error('err', err);
       ctx.status = 500;
       ctx.body = 'Internal error'
   }
});

router.get('/getAllParts', async (ctx) => {
   try {
       const result = await Parts.getParts({...ctx.request.body});
       ctx.body = result;
   } catch (err) {
       console.error('err', err);
       ctx.status = 500;
       ctx.body = 'Internal error'
   }
});
router.get('/getPartsByCode/:code', async (ctx) => {
   try {
       const result = await Parts.getPartsByCode({code: ctx.params.code});
       ctx.body = result;
   } catch (err) {
       console.error('err', err);
       ctx.status = 500;
       ctx.body = 'Internal error'
   }
});

router.get('/', async(ctx) => {
    ctx.body = 'its works!';
});

router.post('/addContractPrinter', async (ctx) => {
    try {
      const result = await ContractPrinter.addNewContractPrinter({
          printer_name: ctx.request.body.printer_model,
          printer_serial_number: ctx.request.body.printer_serial_number,
          client: ctx.request.body.client});
      ctx.body = result;
    } catch (err) {
        console.error('err',err);
        ctx.status = 500;
        ctx.body = 'Internal error'
    }
});

router.post('/addNewCounterToContractPrinter', async (ctx) => {
    try {
        const result = await ContractPrinter.contractPrinterUpdate({
            printer_model: ctx.request.body.printer_model,
            printer_serial_number: ctx.request.body.printer_serial_number,
            client: ctx.request.body.client,
            date: ctx.request.body.date,
            counter: ctx.request.body.counter,
        });
        ctx.body = result;
    } catch (err) {
        console.error('err',err);
        ctx.status = 500;
        ctx.body = 'Internal error'
    }
});

router.post('/addNewPrinterRepair', async (ctx) => {
    console.log(ctx.request.body);
    try {
        const result = await Printer.newPrinterRepair({
            printer_model: ctx.request.body.printer_model,
            executor: ctx.request.body.executor,
            date: ctx.request.body.date,
            invoice_number: ctx.request.body.invoice_number,
            work_type: ctx.request.body.work_type,
            client: ctx.request.body.client,
            used_parts: ctx.request.body.used_parts, // тут надо прогуглить правильность !!! так как не может распознать parts_list
        });
        ctx.body = result;
    } catch (err) {
        console.error('err',err);
        ctx.status = 500;
        ctx.body = 'Internal error'
    }
});

module.exports = router;