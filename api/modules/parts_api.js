const Parts = require('../db/entity/parts_model');

exports.registerNewParts = ({ code, name }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!code) {
        resolve({
          success: false,
          message: 'code is required!!!',
        });
        return;
      } else if (!name) {
        resolve({
          success: false,
          message: 'name is required!!!',
        });
        return;
      }
      const partCheck = await Parts.find({ code });
      if (!partCheck) {
        const parts = new Parts({
          code,
          name,
        });
        const part = await newParts.save();
        resolve({
          result: true,
          message: 'you register new parts',
        });
      } else {
        resolve({
          result: true,
          message: 'this parts already have in database',
        });
      }
    } catch (err) {
      reject(err);
    }
  });

exports.getAllParts = payload =>
  new Promise(async (resolve, reject) => {
    try {
      if (payload.list_limit || payload.list_skip) {
        let query = Parts.find({});
        if (Number(+payload.list_skip) > 1) {
          query = query.skip(+payload.list_limit * (+payload.list_skip - 1));
        }
        const part = await query.limit(+payload.list_limit);
        resolve({
          result: true,
          payload: part,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

exports.getPartsByCode = code =>
  new Promise(async (resolve, reject) => {
    try {
      if (!code) {
        resolve({
          success: false,
          message: 'code is required!!!',
        });
        return;
      }

      const part = await Parts.find({ code });
      resolve({
        result: true,
        code: code,
        payload: part,
      });
    } catch (err) {
      reject(err);
    }
  });
