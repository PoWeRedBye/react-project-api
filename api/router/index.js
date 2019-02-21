const Router = require('koa-router');
const router = new Router();
const PartsApi = require('../parts/parts_api');
const ContractPrinterApi = require('../printers/printers_api');
const PrinterApi = require('../printers/printers_api');
const UserApi = require('../user/user_api');
const auth_utils = require('../utils/authUtils.js');

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
    ctx.status = 500;
    ctx.body = 'Internal error';
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
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});
router.post('/parts/getPartsByCode', async ctx => {
  try {
    ctx.body = await PartsApi.getPartsByCode({ code: ctx.request.body.code });
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error';
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
      printer_photo: ctx.request.files.printer_photo,
      printer_location_photo: ctx.request.files.printer_location_photo,
    });
    ctx.body = result;
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.post('/printer/addNewCounterToContractPrinter', async ctx => {
  try {
    // TODO: authenticate methods
    const result = await ContractPrinterApi.contractPrinterUpdate({
      printer_model: ctx.request.body.printer_model,
      printer_serial_number: ctx.request.body.printer_serial_number,
      client: ctx.request.body.client,
      date: ctx.request.body.date,
      counter: ctx.request.body.counter,
    });
    ctx.body = result;
  } catch (err) {
    console.error('err', err);
    ctx.status = err.message;
    ctx.body = 'Internal error';
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
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

//TODO: User methods:

router.post('/user/refreshAuthData', async ctx => {
  console.log(ctx.request.headers);
  try {
    ctx.body = await auth_utils.refreshAuthFromRefreshToken(ctx.request.header.refreshToken);
  } catch (error) {
    console.error('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
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
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.post('/user/login', async ctx => {
  try {
    my_logger(ctx.body);
    ctx.body = await UserApi.userLogin(ctx);
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error 1111';
  }
});

//TODO: user forgot password methods:
router.post('/user/forgot-password', async ctx => {
  try {
    my_logger(ctx.request.body);
    ctx.body = await UserApi.forgotPass(ctx.request.body.email);
  } catch (error) {
    console.error('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.post('/user/reset-password/:restore_pass_key', async ctx => {
  try {
    my_logger(ctx.params.restore_pass_key);
    ctx.body = await UserApi.resetPassword(ctx.params.restore_pass_key);
  } catch (error) {
    console.error('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.post('/user/change-password', async ctx => {
  try {
    // надо делать
  } catch (error) {
    console.error('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.post('/user/get_all_user', async ctx => {
  try {
    ctx.body = await UserApi.getAllUser({
      list_limit: ctx.request.body.limit,
      list_skip: ctx.request.body.skip,
    });
  } catch (error) {
    console.error('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

//TODO: paginations test

router.post('/test/add', async ctx => {
  try {
    ctx.body = await test_api.uploadDataToDataBase();
  } catch (error) {
    my_logger('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.post('/public/test/get', async ctx => {
  try {
    //my_logger(ctx.params.page_number);
    ctx.body = await test_api.getDataWithPagination(ctx.request.body.page_number);
  } catch (error) {
    my_logger('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

module.exports = router;
