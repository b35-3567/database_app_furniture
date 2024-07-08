const mongoose = require('mongoose');
// Bill Schema
const BillSchema = new mongoose.Schema({
    BillID: { type: Number, required: true, unique: true },
    Date: { type: Date, required: true },
    AccountID: { type: Number, required: true, ref: 'Account' }
  });
  
  const Bill = mongoose.model('Bill', BillSchema);
  module.exports=Bill;