const Printer = require('../db/entity/printer');
const ContractPrinter = require('../db/entity/contract_printer');
const PartsList = require('../db/entity/parts_model');
const ConsumptionParts = require('../db/entity/consumption_parts');
const photoUtils = require('../utils/photoUtils');

const fs = require('fs');

// POST - BASE_URL/addNewPrinterRepair
exports.newPrinterRepair = payload =>
  new Promise(async (resolve, reject) => {
    const {
      printer_model,
      executor,
      date,
      invoice_number,
      work_type,
      client,
      used_parts,
    } = payload;

    try {
      if (!printer_model) {
        resolve({
          success: false,
          message: 'printer model is required!!!',
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
        const newPrinterRepair = new Printer({
          printer_model,
          executor,
          date,
          invoice_number,
          work_type,
          client,
        });
        const new_repair_printer = await newPrinterRepair.save();
        resolve({
          result: true,
          data: new_repair_printer,
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
        const newPrinterRepair = new Printer(payload);
        await newPrinterRepair.save();
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
          message: newPrinterRepair,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

// Contract Printers methods

// POST -> BASE_URL/addContractPrinter
exports.addNewContractPrinter = payload =>
  new Promise(async (resolve, reject) => {
    console.log(payload);
    try {
      const {
        printer_model,
        printer_serial_number,
        client,
        current_counter
      } = payload;

      if (!printer_model || !printer_serial_number || !client) {
        resolve({
          success: false,
          message: 'bad credentials',
        });
        return;
      }
      const newPrinter = await ContractPrinter.findOne({ printer_serial_number });
      if (!newPrinter && !current_counter) {
        const newContractPrinter = new ContractPrinter({
          printer_model: printer_model,
          printer_serial_number: printer_serial_number,
          client: client,
        });
        const contractPrinter = await newContractPrinter.save();
        resolve({
          result: true,
          data: contractPrinter,
        });
      } else if(!newPrinter && current_counter){
        const newContractPrinter = new ContractPrinter({
          printer_model: printer_model,
          printer_serial_number: printer_serial_number,
          client: client,
          current_counter: current_counter,
        });
        const contractPrinter = await newContractPrinter.save();
        resolve({
          result: true,
          data: contractPrinter,
        });
      } else {
        resolve({
          result: false,
          message: 'this serial number is already in database',
        });
      }
    } catch (err) {
      reject(err);
    }
  });
// POST -> BASE_URL/addNewCounterToContractPrinter
exports.contractPrinterUpdate = (payload) =>
  new Promise(async (resolve, reject) => {
    const {printer_serial_number,
      counter,
      new_cartridge,
      new_fix_unit,
      new_oscillatory_node,
      new_rollers,
      new_maintenance,
      nothing} = payload;
    try {
      if (!counter) {
        resolve({
          result: false,
          message: 'counter is required',
        });
        return;
      } else if (!printer_serial_number){
        resolve({
          result: false,
          message: 'serial number is required'
        });
        return;
      }
      const contractPrinter = await ContractPrinter.findOne({ printer_serial_number });
      if (contractPrinter.current_counter !== null) {
        if (contractPrinter.current_counter > counter) {
          resolve({ result: false, message: 'wrong counters' });
          return;
        } else {
          contractPrinter.previous_counter = contractPrinter.current_counter;
          contractPrinter.current_counter = counter;
          contractPrinter.counters.push({
            counter,
            new_cartridge,
            new_fix_unit,
            new_oscillatory_node,
            new_rollers,
            new_maintenance,
            nothing,
          });
          const contract_printer = await contractPrinter.save();
          resolve({ result: true, data: contract_printer });
          return;
        }
      } else {
        contractPrinter.counters.push({ counter,
          new_cartridge,
          new_fix_unit,
          new_oscillatory_node,
          new_rollers,
          new_maintenance,
          nothing});
        contractPrinter.current_counter = counter;
        const contract_printer = await contractPrinter.save();
        resolve({
          result: true,
          data: contract_printer,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

// GET -> BASE_URL/getPrinterByClient
exports.getContractPrintersByClient = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!payload.client) {
        resolve({
          result: false,
          message: 'client is required!',
        });
        return;
      } else {
        const someClientPrinters = await ContractPrinter.find({ client: payload.client });
        resolve({
          result: true,
          data: someClientPrinters,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

// GET -> BASE_URL/getPrinterBySerialNumber
exports.getPrinterBySN = ({ printer_serial_number }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!printer_serial_number) {
        resolve({
          result: false,
          message: 'serial number is required!',
        });
        return;
      } else {
        const somePrinterBySN = await ContractPrinter.findOne({ printer_serial_number });
        resolve({
          result: true,
          data: somePrinterBySN,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

// GET => BASE_URL/getAllPrinterRepair
exports.getAllPrinterRepair = () =>
  new Promise(async (resolve, reject) => {
    try {
      const allRepairedPrinters = await Printer.find();
      if (!allRepairedPrinters) {
        resolve({
          result: false,
          message: "oops, you don't have nothing at this category",
        });
      } else {
        resolve({
          result: true,
          data: allRepairedPrinters,
        });
      }
    } catch (err) {
      reject(err);
    }
  });

//get contract printers by - organizations(client) / serial number
