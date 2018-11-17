const Printer = require('../db/models/printer');
const ContractPrinter = require('../db/models/contract_printer');

exports.newPrinterRepair = ({printer_model,
                                executor,
                                date,
                                invoice_number,
                                work_type,
                                client,
                                used_parts: [{
                                    part_code,
                                    part_name,
                                    part_quantity}],
                            }) => new Promise(async (resolve, reject) => {
    try{
        if (!printer_model){
            resolve({
                success: false,
                message: 'printer model is required!!!'
            });
            return;
        } else if (!executor){
            resolve({
                success: false,
                message: 'executor is required!!!'
            });
            return;
        } else if (!work_type){
            resolve({
                success: false,
                message: 'work type is required!!!'
            });
            return;
        } else if (!client){
            resolve({
                success: false,
                message: 'client is required!!!'
            });
            return;
        } else if (used_parts.length === 0){
            const newPrinterRepair = new Printer({
                printer_model,
                executor,
                date,
                invoice_number,
                work_type,
                client
            });
            const new_repair_printer = await newPrinterRepair.save();
            resolve({
                result: true,
                data: new_repair_printer
            });
            return;
        }

        const newPrinterRepair = new Printer({
            printer_model,
            executor,
            date,
            invoice_number,
            work_type,
            client
        });
        // newPrinterRepair.used_parts.each(used_parts);  -- need to be a check!!!
        newPrinterRepair.used_parts.insertMany(used_parts);
        const new_repair_printer = await newPrinterRepair.save();
        resolve({
            result: true,
            data: new_repair_printer
        });
    } catch (err) {
        reject(err);
    }
});


// Contract Printers methods

exports.addNewContractPrinter = ({printer_model, printer_serial_number, client}) => new Promise(async (resolve, reject) => {
   try{
       if (!printer_model){
           resolve({
               success: false,
               message: 'printer model is required!!!'
           });
           return;
       } else if (!printer_serial_number){
           resolve({
               success: false,
               message: 'serial number is required!!!'
           });
           return;
       } else if (!client){
           resolve({
               success: false,
               message: 'client is required!!!'
           });
           return;
       }

       const newContractPrinter = new ContractPrinter({
          printer_model,
          printer_serial_number,
          client,
       });

       const contractPrinter = await newContractPrinter.save();
       resolve({
           result: true,
           data: contractPrinter
       });

   } catch (err) {
       reject(err);
   }
});

exports.contractPrinterUpdate = ({printer_model, printer_serial_number, client, date, counter}) => new Promise(async (resolve,reject) => {
   try{
       if (!date){
           resolve({
               result: false,
               message: 'date is required',
           });
           return;
       } else if (!counter){
           resolve({
              result: false,
              message: 'counter is required',
           });
           return;
       }
       const contractPrinter =  await ContractPrinter.findOne({printer_serial_number});
       contractPrinter.counters.push({date, counter});
       const contract_printer = await contractPrinter.save();
       resolve({
           result: true,
           data: contract_printer
       });
   } catch (err) {
       reject(err);
   }
});
