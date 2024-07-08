const mongoose = require('mongoose');
// Account Schema
const AccountSchema = new mongoose.Schema({
    Email: { type: String, required: true, unique: true },
    Fullname: { type: String, required: true },
    Password: { type: String, required: true }
  });
  
  const Account = mongoose.model('Account', AccountSchema);
  module.exports=Account;