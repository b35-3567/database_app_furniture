const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

// API để thêm sản phẩm mới
router.post('/add_product', async (req, res) => {
  const { productID, productName, price, quantity, categoryID,productImage } = req.body;

  try {
    let product = await Product.findOne({ ProductID: productID });
    if (product) {
      return res.status(400).json({ message: 'Product already exists' });
    }

    product = new Product({
      ProductID: productID,
      ProductName: productName,
      Price: price,
      Quantity: quantity,
      CategoryID: categoryID,
      ProductImage:productImage
    });

    await product.save();

    res.status(201).json({ message: 'Product added successfully' ,product});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// API để hiển thị sản phẩm theo CategoryID
router.get('/category/:categoryID', async (req, res) => {
  const { categoryID } = req.params;

  try {
    const products = await Product.find({ CategoryID: categoryID });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// API để hiển thị sản phẩm theo Product
router.get('/product/:productID', async (req, res) => {
  const { productID } = req.params;

  try {
    const products = await Product.find({ ProductID: productID });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
