const mongoose = require('mongoose');
// Product Schema
const ProductSchema = new mongoose.Schema({
    ProductID: { type: Number, required: true, unique: true },
    ProductName: { type: String, required: true },
    Price: { type: Number, required: true },
    Quantity: { type: Number, required: true },
    CategoryID: { type: Number, required: true, ref: 'Category' },
    ProductImage:{type:String, required: true}
  });
  
  const Product = mongoose.model('Product', ProductSchema);
  module.exports=Product;