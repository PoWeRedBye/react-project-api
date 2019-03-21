const random_string = require('randomstring');
const test_db = require('../db/entity/test');

const generateAddData = () => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    let random = random_string.generate({
      length: 16,
      charset: 'alphanumeric',
    });
    const test = { test_name: random };
    data.push(test);
  }
  return data;
};

exports.uploadDataToDataBase = () =>
  new Promise(async (resolve, reject) => {
    try {
      const data = await generateAddData();
      my_logger(data);
      let new_test_model = await test_db.insertMany(data, function(err) {});
      my_logger(new_test_model);
      const get_data = await test_db.find({});
      resolve({
        result: true,
        payload: get_data,
      });
    } catch (error) {
      reject(error);
    }
  });

exports.getDataWithPagination = payload =>
  new Promise(async (resolve, reject) => {
    const page_number = payload;
    try {
      let query = test_db.find({});
      if (page_number > 1) {
        query = query.skip(5 * (page_number - 1));
      }

      const test_data = await query.limit(5);
      resolve({
        result: true,
        payload: test_data,
        message: `your data for page ${page_number}`,
      });
    } catch (error) {
      reject(error);
    }
  });
