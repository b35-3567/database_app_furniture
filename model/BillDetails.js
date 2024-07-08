const mongoose = require('mongoose');
// BillDetails Schema
const BillDetailsSchema = new mongoose.Schema({
    BillID: { type: Number, required: true, ref: 'Bill' },
    ProductID: { type: Number, required: true, ref: 'Product' },
    Quantity: { type: Number, required: true },
    Price: { type: Number, required: true }
  });
  
  const BillDetails = mongoose.model('BillDetails', BillDetailsSchema);
  module.exports = {
    BillDetails
  };