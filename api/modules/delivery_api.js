const delivery_db = require('../db/entity/delivery');
const delivery_items_db = require('../db/entity/delivery_items');

const add_new_delivery_items = async payload => {
  const {item_name, item_category} = payload;
  try {
    if (!item_category || !item_name) {
      return false;
    } else {
      const new_item = await delivery_items_db.create({
        item_name: item_name,
        item_category: item_category
      });
      return true;
    }
  } catch (error) {
    return error;
  }
};

const get_all_delivery_items = async () => {
  try {
    // const delivery_items = await delivery_items_db.find({});
    return await delivery_items_db.find({});
  } catch (error) {
    return error;
  }
};

const create_new_delivery = async client => {
  try {
    if (client) {
      const new_delivery = await delivery_db.create({
        client: client,
        inOffice: false,
        finished: false,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

const update_delivery = async payload => {
  try {
    if (payload.id) {
      let delivery = await delivery_db.find({_id: payload.id});
      delivery.inOffice = true;
      await delivery.push(payload.items);
      await delivery.save();
      return true;
    } else {
      return false
    }
  } catch (error) {

  }
};

const finish_delivery = async payload => {
  try {
    if (payload) {
      let delivery = await delivery_db.find({_id: payload.id});
      delivery.finished = true;
      await delivery.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

const get_all_not_finished_delivery = async payload => {
  try {
    if (payload.list_limit || payload.list_skip) {
      let query = delivery_db.find({finished: false});
      if (Number(+payload.list_skip) > 1) {
        query = query.skip(+payload.list_limit * (+payload.list_skip - 1));
      }
      const deliveries = await query.limit(+payload.list_limit);
      return deliveries;
    } else {
      const deliveries = await delivery_db.find({finished: false});
      return deliveries;
    }
  } catch (error) {
    return error;
  }
};

exports.add_new_delivery = payload => new Promise(async (resolve, reject) => {
  try {
    const delivery = await create_new_delivery(payload);
    if (delivery) {
      resolve({
        result: true,
        message: 'You have successfully created a new delivery',
      });
    } else {
      reject({
        result: false,
        code: 400,
        message: 'bad credentials'
      });
    }

  } catch (error) {
    reject(error);
  }
});

exports.not_finished_deliveries = payload => new Promise(async (resolve, reject) => {
  try {
    const deliveries = await get_all_not_finished_delivery(payload);
    if (deliveries) {
      resolve({
        result: true,
        payload: deliveries,
      });
    } else {
      reject({
        result: false,
        code: 400,
        message: 'bad credentials'
      });
    }
  } catch (error) {
    reject(error);
  }
});

exports.delivery_finish = payload => new Promise(async (resolve, reject) => {
  try {
    const finish = await finish_delivery(payload.id);
    if (finish) {
      const delivery = await delivery_db.find({finished: false}).limit(50);
      resolve({
        result: true,
        payload: delivery,
      });
    } else {
      reject({
        result: false,
        code: 400,
        message: 'bad credentials'
      });
    }
  } catch (error) {
    reject(error);
  }
});

exports.delivery_update = payload => new Promise(async (resolve, reject) => {
  const {id, items} = payload;
  try {
    const delivery = await update_delivery(id, items);
    if (delivery) {
      resolve({
        result: true,
      });
    } else {
      reject({
        result: false,
        code: 400,
        message: 'bad credentials'
      });
    }
  } catch (error) {
    reject(error);
  }
});

//TODO: need review and refactoring this class, many stupid methods without!!!
