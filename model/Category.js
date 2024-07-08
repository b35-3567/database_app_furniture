const mongoose = require('mongoose');

// Category Schema
const CategorySchema = new mongoose.Schema({
  CategoryID: { type: Number, required: true, unique: true },
  CategoryName: { type: String, required: true }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports=Category;