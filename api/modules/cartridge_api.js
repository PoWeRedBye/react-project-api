const PartsList = require('../db/entity/parts_model');
const ConsumptionParts = require('../db/entity/consumption_parts');
const Cartridge = require('../db/entity/cartridge');

exports.newCartridgeRefill = payload =>
  new Promise(async (resolve, reject) => {
    const {
      cartridge_name,
      cartridge_code,
      executor,
      date,
      invoice_number,
      work_type,
      client,
      used_parts,
    } = payload;

    try {
      if (!cartridge_name) {
        resolve({
          success: false,
          message: 'cartridge name is required!!!',
        });
        return;
      } else if (!cartridge_code) {
        resolve({
          success: false,
          message: 'cartridge code is required!!!',
        });
        return;
      } else if (!executor) {
        resolve({
          success: false,
          message: 'executor is required!!!',
        });
        return;
      } else if (!work_type) {
        resolve({
          success: false,
          message: 'work type is required!!!',
        });
        return;
      } else if (!client) {
        resolve({
          success: false,
          message: 'client is required!!!',
        });
        return;
      } else if (!used_parts) {
        const newCartridgeRefill = new Cartridge({
          cartridge_name,
          cartridge_code,
          executor,
          date,
          invoice_number,
          work_type,
          client,
        });
        const new_cartridge_refill = await newCartridgeRefill.save();
        resolve({
          result: true,
          data: new_cartridge_refill,
        });
        return;
      } else if (used_parts.length) {
        // get same parts but from database
        let selectedPartsFromDB = await PartsList.find({
          code: { $in: used_parts.map(_ => _.part_code) },
        });
        // check if all parts exist in database
        if (used_parts.length !== selectedPartsFromDB.length) {
          // throw error
          resolve({
            success: false,
            message: 'items not found in db',
          });
          return;
          // return error;
        }

        // format parts list from database to simplify further usage
        selectedPartsFromDB = used_parts.reduce(
          (result, item) => ({ ...result, [item.part_code]: item }),
          {},
        );
        // detect failed parts
        const failedPartsList = used_parts.filter(
          item => item.part_quantity > selectedPartsFromDB[item.part_code].amount,
        );

        if (failedPartsList.length) {
          // throw error
          resolve({
            success: false,
            message: 'items amount is not correct ',
          });
          return;
          // return error;
        }

        // proceed with database updates and inserts
        const api_date = new Date(); // +(new Date()); - timestamp
        const newCartridgeRefill = new Cartridge(payload);
        await newCartridgeRefill.save();
        await ConsumptionParts.insertMany(
          used_parts.map(item => ({
            name: item.part_name,
            code: item.part_code,
            quantity: item.part_quantity,
            date: api_date,
            invoice_number: invoice_number,
            user: 'some user',
          })),
        );

        for (let i = 0; i < used_parts.length - 1; i++) {
          const myParts = await PartsList.findOne({ code: used_parts[i].code });
          const partAmount = +used_parts[i].amount - +myParts.amount;
          const parts = new PartsList({
            code: myParts.code,
            amount: partAmount,
            name: myParts.name,
          });
          await parts.save();
        }

        /*
                        const tralala = await PartsList.updateMany({code: used_parts.map(_ => _.part_code)}, // incorrect filter queries
                            used_parts.map(item => ({
                                code: item.part_code,
                                name: item.part_name,
                                amount: selectedPartsFromDB[item.part_code].amount - item.part_quantity,
                            }))
                        );
                        console.log(tralala);
                        console.log('******'.repeat(20));
                        const PartsListTrouble = await PartsList.updateMany(  // need to fix this update
                            {code: {'$in': '{used_parts.map(_ => _.part_code)}'}}, // incorrect filter queries
                            used_parts.map(item => ({
                                code: item.part_code,
                                name: item.part_name,
                                amount: selectedPartsFromDB[item.part_code].amount - item.part_quantity,
                            }))
                        );

                        console.log(PartsListTrouble);
                        console.log('======'.repeat(50));
            */
        resolve({
          result: true,
          message: newCartridgeRefill,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

// GET => BASE_URL/getAllRefill
exports.getAllRefill = () =>
  new Promise(async (resolve, reject) => {
    try {
      const allRefill = await Cartridge.find();
      resolve({
        result: true,
        data: allRefill,
      });
    } catch (err) {
      reject(err);
    }
  });

// GET => BASE_URL/getAllRefillByClient
exports.getRefillByClient = client =>
  new Promise(async (resolve, reject) => {
    try {
      if (!client) {
        resolve({
          result: false,
          message: 'client is required!!!',
        });
        return;
      } else {
        const someClientRefill = await Cartridge.find({ client });
        resolve({
          result: true,
          data: someClientRefill,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

// GET => BASE_URL/getAllRefillByCartridgeCode
exports.getAllRefillByCartridgeCode = cartridge_code =>
  new Promise(async (resolve, reject) => {
    try {
      if (!cartridge_code) {
        resolve({
          result: false,
          message: 'cartridge code is required!!!',
        });
        return;
      } else {
        const allRefillByCode = await Cartridge.find({ cartridge_code });
        resolve({
          result: true,
          data: allRefillByCode,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
