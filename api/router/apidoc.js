//TODO: need check all methods and create @apiSuccessExample -> in JSON format

/**
 * @api {post} /user/registration User registration
 * @apiName User register
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 *
 * @apiParam  {String} displayName user first and last name.
 * @apiParam  {String} email user email.
 * @apiParam  {String} password user password.
 * @apiParam  {File} user_photo user avatar
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *   {
 *   "result": 200,
 *   "user": {
 *       "id": "5c6c6c31f8132c24bcaa48f6",
 *       "email": "some_mail@mail.com",
 *       "displayName": "some_login",
 *       "userPhotoName": "user_photo_name",
 *       "userPhotoPath": "user_photo_path",
 *       "userPhotoType": "user_photo_type",
 *   },
 *   "token": "some token",
 *   "refreshToken": "some refresh token"
 *   }
 *
 */

/**
 * @api {post} /user/login User login
 * @apiName User Login
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 *
 * @apiParam {String} login Some user login
 * @apiParam {String} password Some user password
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *  {
 *   "result": 200,
 *   "user": {
 *       "id": "some id",
 *       "email": "some_mail@mail.com",
 *       "displayName": "some name"
 *   },
 *   "token": "some token",
 *   "refreshToken": "some refresh token"
 *  }
 *
 */

/**
 * @api {post} /user/forgot-password User forgot password
 * @apiName Forgot password
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 *
 * @apiParam {String} email some user email
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "result": 200,
 *    "message": "check your mail and follow the instructions"
 *  }
 *
 */

//TODO: !!!! not complete
/**
 * @api {post} /user/change-password Change password
 * @apiName Change Password
 * @apiGroup User
 *
 * @apiDescription User must be logged and have access-key!!!
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} token Users unique refresh access-key.
 *
 * @apiParam {String} old_pass Old password
 * @apiParam {String} new_pass New password
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 */

/**
 * @api {post} /user/get_all_user Get all registered users
 * @apiName Get All Users
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} token Users unique refresh access-key.
 *
 * @apiParam {Number} limit Counter of items extracted from db
 * @apiParam {Number} skip Page number
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *  "result": 200,
 *  "data": [
 *      {
 *          "id": "some user id",
 *          "displayName": "some user name",
 *          "email": "some_user_mail@some_mail.com",
 *          "user_photo_path": "some_user_photo_path",
 *      },
 *    ],
 *  }
 *
 */

/**
 * @api {post} /user/refreshAuthData Refresh Authentication
 * @apiName Refresh Auth data
 * @apiGroup User
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} token Users unique refresh access-key.
 *
 * @apiSuccess {String} token Users new unique access-key.
 * @apiSuccess {String} refreshToken  Users new unique access-key.
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 */

//TODO: not working!!! need add this url in excluded url list in auth middleware!!!
/**
 * @api {post} /user/reset-password/:restore_pass_key Restore Password
 * @apiName Restore Password
 * @apiGroup User
 *
 * @apiDescription not working!!! need add this url in list of excluded url in auth middleware!!!
 *
 * @apiParam {String} restore_pass_key random generated key
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 *
 */

/**
 * @api {post} /parts/registerNewParts Register new parts
 * @apiName Register New Parts
 * @apiGroup Parts
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} token Users unique access-key.
 *
 * @apiParam {String} code Parts unique key.
 * @apiParam {String} name Parts name.
 *
 * @apiSuccess {Boolean} result .
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 */

/**
 * @api {post} /parts/getAllParts Get all parts with limit and offset
 * @apiName Get All Parts
 * @apiGroup Parts
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} token Users unique access-key.
 *
 * @apiParam {Number} limit Counter of items extracted from db
 * @apiParam {Number} skip Page number
 *
 * @apiSuccess {Object} partsList List of parts
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 */

/**
 * @api {post} /parts/getPartsByCode Get parts by code
 * @apiName Get Parts By Code
 * @apiGroup Parts
 *
 * @apiHeader {String} Content-Type application/x-www-form-urlencoded
 * @apiHeader {String} token Users unique access-key.
 *
 * @apiParam {String} code Unique part code
 *
 * @apiSuccess {Object} part Some part
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *
 */
