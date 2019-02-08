const Router = require('koa-router');
const router = new Router();
const PartsApi = require('../parts/parts_api');
const ContractPrinterApi = require('../printers/printers_api');
const PrinterApi = require('../printers/printers_api');
const UserApi = require('../user/user_api');
const auth_utils = require('../utils/authUtils.js');
const multer  = require('multer');
const mail = require('../mail_sender/mailSender');
const upload = multer({ dest: 'uploads/' });
//TODO: Parts methods:

router.post('/parts/addParts', async ctx => {
  try {
    const myAuth = await auth_utils.checkAuth(ctx.request.header.token);  // TODO: authenticate methods
    console.log(myAuth);
    if (myAuth) {
    const result = await PartsApi.addParts({
      code: ctx.request.body.code,
      name: ctx.request.body.name,
      amount: ctx.request.body.amount,
      token: ctx.request.headers.get(auth),// надо бы проверить
    });
    ctx.body = result;
    } else {                                                              // TODO: authenticate methods
      ctx.status = 401;                                                   // TODO: authenticate methods
      ctx.body = 'Authentication error';                                  // TODO: authenticate methods
    }
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.get('/parts/getAllParts', async ctx => {
  try {
    const myAuth = await auth_utils.checkAuth(ctx.request.header.token);  // TODO: authenticate methods
    console.log(myAuth);
    if (myAuth) {
      const result = await PartsApi.getParts({...ctx.request.body});
      ctx.body = result;
    } else {                                                              // TODO: authenticate methods
      ctx.status = 401;                                                   // TODO: authenticate methods
      ctx.body = 'Authentication error';                                  // TODO: authenticate methods
    }
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});
router.get('/parts/getPartsByCode/:code', async ctx => {
  try {
    const myAuth = await auth_utils.checkAuth(ctx.request.header.token);  // TODO: authenticate methods
    console.log(myAuth);
    if (myAuth) {
    const result = await PartsApi.getPartsByCode({code: ctx.params.code});
    ctx.body = result;
  } else {                                                              // TODO: authenticate methods
    ctx.status = 401;                                                   // TODO: authenticate methods
    ctx.body = 'Authentication error';                                  // TODO: authenticate methods
    }
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

//const LOWOOT = upload.fields([{ name: 'printer_photo', maxCount: 1 }, { name: 'printer_location_photo', maxCount: 1 }]);
router.post('/printer/contract/addContractPrinter'/*, LOWOOT*/, async ctx => {
  //console.log(ctx.request.files);
  //console.log(ctx.request.body);
  const {name, type, path, size} = ctx.request.files.printer_photo;
  logger(name, type, path, size);

  try {
    const myAuth = await auth_utils.checkAuth(ctx.request.header.token);  // TODO: authenticate methods
    //console.log(myAuth);
    if (myAuth) {
    const result = await ContractPrinterApi.addNewContractPrinter({
      printer_model: ctx.request.body.printer_model,
      printer_serial_number: ctx.request.body.printer_serial_number,
      client: ctx.request.body.client,
      printer_photo: ctx.request.files.printer_photo,
      printer_location_photo: ctx.request.files.printer_location_photo,
    });
    ctx.body = result;
    } else {                                                              // TODO: authenticate methods
      ctx.status = 401;                                                   // TODO: authenticate methods
      ctx.body = 'Authentication error';                                  // TODO: authenticate methods
    }
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

router.post('/printer/addNewCounterToContractPrinter', async ctx => {
  try {
    const myAuth = await auth_utils.checkAuth(ctx.request.header.token);  // TODO: authenticate methods
    console.log(myAuth);
    if (myAuth) {                                                         // TODO: authenticate methods
      const result = await ContractPrinterApi.contractPrinterUpdate({
          printer_model: ctx.request.body.printer_model,
          printer_serial_number: ctx.request.body.printer_serial_number,
          client: ctx.request.body.client,
          date: ctx.request.body.date,
          counter: ctx.request.body.counter,
        });
      ctx.body = result;
    } else {                                                              // TODO: authenticate methods
      ctx.status = 401;                                                   // TODO: authenticate methods
      ctx.body = 'Authentication error';                                  // TODO: authenticate methods
    }
  } catch (err) {
    console.error('err', err);
    ctx.status = err.message;
    ctx.body = 'Internal error';
  }
});



router.post('/printer/addNewPrinterRepair', async ctx => {
  console.log(ctx.request.body);
  try {
    const myAuth = await auth_utils.checkAuth(ctx.request.header.token);  // TODO: authenticate methods
    console.log(myAuth);
    if (myAuth) {
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
    } else {                                                              // TODO: authenticate methods
      ctx.status = 401;                                                   // TODO: authenticate methods
      ctx.body = 'Authentication error';                                  // TODO: authenticate methods
    }
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

//TODO: User methods:
/**
 * @api {post} /user/refreshAuthData Request User information
 * @apiName RefreshAuthData1
 * @apiGroup User
 *
 * @apiHeader {String} token Users unique access-key.
 *
 * @apiSuccess {String} token Users unique access-key.
 * @apiSuccess {String} refreshToken  Users unique access-key.
 */
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

/**
 * @api {post} /user/registration Request User information
 * @apiName RefreshAuthData
 * @apiGroup User
 *
 * @apiHeader {String} token Users unique access-key.
 *
 * @apiParam  {String} displayName user first and last name.
 * @apiParam  {String} email user email.
 * @apiParam  {String} password user password.
 *
 * @apiSuccess {Object} user User information.
 * @apiSuccess {String} token Users unique access-key.
 * @apiSuccess {String} refreshToken  Users unique access-key.
 * @apiVersion 0.0.0
 */
router.post('/user/registration', async ctx => {
  console.log(ctx.request.body);
  try {
    const result = await UserApi.registerNewUser({
      displayName: ctx.request.body.displayName || ctx.request.body.login,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
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
    ctx.body = await UserApi.userLogin(ctx);
  } catch (err) {
    console.error('err', err);
    ctx.status = 500;
    ctx.body = 'Internal error 1111';
  }
});

//TODO: user forgot password methods:
router.post('/user/forgot-password', async ctx =>{
  try {
    logger(ctx.request.body);
    ctx.body = await UserApi.forgotPass(ctx.request.body.email);
  }catch (error) {
    console.error('err', error);
    ctx.status = 500;
    ctx.body = 'Internal error';
  }
});

module.exports = router;
