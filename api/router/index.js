const Router = require('koa-router');
const router = new Router();
const PartsApi = require('../modules/parts_api');
const ContractPrinterApi = require('../modules/printers_api');
const PrinterApi = require('../modules/printers_api');
const UserApi = require('../modules/user_api');
const auth_utils = require('../utils/authUtils.js');
const doc_api = require('../modules/documents_api');

const test_api = require('../utils/test_api');

//TODO: Parts methods:
router.post('/parts/registerNewParts', async ctx => {
  try {
    const result = await PartsApi.registerNewParts({
      code: ctx.request.body.code,
      name: ctx.request.body.name,
    });
    ctx.body = result;
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.get('/parts/getAllParts', async ctx => {
  try {
    ctx.body = await PartsApi.getAllParts({
      limit: ctx.request.body.limit,
      skip: ctx.request.body.skip,
    });
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});
router.post('/parts/getPartsByCode', async ctx => {
  try {
    ctx.body = await PartsApi.getPartsByCode({ code: ctx.request.body.code });
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

// TODO: test get method
router.get('/', async ctx => {
  ctx.body = 'its works!';
});

//TODO: Printer methods:

router.post('/printer/contract/addContractPrinter', async ctx => {
  try {
    const result = await ContractPrinterApi.addNewContractPrinter({
      printer_model: ctx.request.body.printer_model,
      printer_serial_number: ctx.request.body.printer_serial_number.toString(),
      client: ctx.request.body.client,
      current_counter: ctx.request.body.current_counter,
    });
    ctx.body = result;
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/printer/contract/getAllContractPrinterByClient', async ctx => {
  try {
    const result = await ContractPrinterApi.getContractPrintersByClient(ctx.request.body);
    ctx.body = result;
  } catch (err) {
    console.error('error', err);
    ctx.status = error.code;
    ctx.body = error;
  }
});

router.post('/printer/contract/addNewCounterToContractPrinter', async ctx => {
  try {
    // TODO: authenticate methods
    const result = await ContractPrinterApi.contractPrinterUpdate({
      printer_serial_number: ctx.request.body.printer_serial_number,
      counter: ctx.request.body.counter,
      new_cartridge: ctx.request.body.new_cartridge,
      new_fix_unit: ctx.request.body.new_fix_unit,
      new_oscillatory_node: ctx.request.body.new_oscillatory_node,
      new_rollers: ctx.request.body.new_rollers,
      new_maintenance: ctx.request.body.new_maintenance,
      nothing: ctx.request.body.nothing,
    });
    ctx.body = result;
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/printer/addNewPrinterRepair', async ctx => {
  console.log(ctx.request.body);
  try {
    const result = await PrinterApi.newPrinterRepair({
      printer_model: ctx.request.body.printer_model,
      executor: ctx.request.body.executor,
      date: ctx.request.body.date,
      invoice_number: ctx.request.body.invoice_number,
      work_type: ctx.request.body.work_type,
      client: ctx.request.body.client,
      used_parts: ctx.request.body.used_parts,
    });
    console.log(result, 'tyt 4to-to doljno bit');
    ctx.body = result;
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

//TODO: User methods:

router.post('/user/refreshAuthData', async ctx => {
  console.log(ctx.request.headers);
  try {
    ctx.body = await auth_utils.refreshAuthFromRefreshToken(ctx.request.header.refreshToken);
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/user/registration', async ctx => {
  console.log(ctx.request.body);
  try {
    const result = await UserApi.registerNewUser({
      displayName: ctx.request.body.displayName || ctx.request.body.login,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
      user_photo: ctx.request.body.user_photo,
    });
    ctx.body = result;
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/user/login', async ctx => {
  try {
    my_logger(ctx.body);
    ctx.body = await UserApi.userLogin(ctx);
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

//TODO: user forgot password methods:
router.post('/user/forgot-password', async ctx => {
  try {
    my_logger(ctx.request.body);
    ctx.body = await UserApi.forgotPass(ctx.request.body.email);
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/user/reset-password/:restore_pass_key', async ctx => {
  try {
    my_logger(ctx.params.restore_pass_key);
    ctx.body = await UserApi.resetPassword(ctx.params.restore_pass_key);
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/user/change-password', async ctx => {
  try {
    // надо делать
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/user/get_all_user', async ctx => {
  try {
    ctx.body = await UserApi.getAllUser({
      list_limit: ctx.request.body.limit,
      list_skip: ctx.request.body.skip,
    });
  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

//TODO: {pdf}

router.post('/template-invoice', async ctx => {
  try{

  } catch (err) {
    console.error('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

//TODO: paginations test

router.post('/test/add', async ctx => {
  try {
    ctx.body = await test_api.uploadDataToDataBase();
  } catch (err) {
    my_logger('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.post('/public/test/get', async ctx => {
  try {
    //my_logger(ctx.params.page_number);
    ctx.body = await test_api.getDataWithPagination(ctx.request.body.page_number);
  } catch (err) {
    my_logger('err', err);
    ctx.status = err.code;
    ctx.body = err;
  }
});

router.get('/pdf/test', async ctx => {
  try {
    ctx.body = await doc_api.generateFopInvoice();
  } catch (err) {
    my_logger('err', err);
    ctx.status = 500;
    ctx.body = err;
  }
});

module.exports = router;
