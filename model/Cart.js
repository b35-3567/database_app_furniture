const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    Email: { type: String, required: true }, // Email của người dùng
    ProductID: { type: Number, ref: 'Product', required: true }, // ID của sản phẩm và nó sẽ reference của product
    Quantity: { type: Number, required: true }, // Số lượng sản phẩm trong giỏ hàng
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
