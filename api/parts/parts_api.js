const Parts = require('../db/models/parts_model');

exports.addParts = ({code, name, amount}) => new Promise(async (resolve , reject) => {
    try {
        if (!code){
            resolve({
                success: false,
                message: 'code is required!!!'
            });
            return;
        } else if (!name){
            resolve({
                success: false,
                message: 'name is required!!!'
            });
            return;
        }

        const newParts = new Parts({
           code,
           name,
           amount,
        });

        const part = await newParts.save();
        resolve({
            result: true,
            data: part
        });
    }
    catch (err) {
        reject(err);
    }
});

exports.getParts = () => new Promise(async (resolve , reject) =>  {
    try {
        const part = await Parts.find();
        resolve({
            result: true,
            data: part
        });
    }
    catch (err) {
        reject(err);
    }
});

exports.getPartsByCode = ({code}) => new Promise(async (resolve , reject) =>  {
    try {
        if (!code) {
            resolve({
                success: false,
                message: 'code is required!!!'
            });
            return;
        }

        const part = await Parts.find({code}); // not works!!!
        resolve({
            result: true,
            code: code,
            data: part
        });
    }
    catch (err) {
        reject(err);
    }
});