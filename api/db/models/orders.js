const mongoose = require('mongoose');

/**
 * query = getAll, getByPaid, getByClient, getByProvider, getByDate, getByNumber
 */

const invoiceSchema = new mongoose.Schema(
  {
    //номер счета:
    invoice_number: String,
    //артикул
    invoice_description: String,
    //дельта
    invoice_delta: String,
    //сумма счета
    invoice_invoice_amount: String,
    //поставщик
    provider: String,
    //сумма счета поставщика
    provider_invoice_amount: String,
    //номер счета поставщика
    provider_invoice_number: String,
    //клиент
    invoice_client: String,
    //статус оплаты
    paid_status: Boolean,
    //наши экземпляры документов
    document_comeback: Boolean,
    //акт выполненных работ
    invoice_certificate: String,

    //дата для старых/выписанных заним числом счетов
    invoice_custom_date: String,

    /** TODO: надо покумекать нужно ли мне это поле*/
    //дата
    our_invoice_date: {
      type: Date,
    },
    //дата счета поставщика
    provider_invoice_date: String,
  },
  {
    timestamps: true,
  },
);

//deliverySchema.createIndex({createdAt: Date.now()}, {expireAfterSeconds: 2592000 /* 30 days live */}); // need to be checked!!!

module.exports = mongoose.model('invoice', invoiceSchema);
