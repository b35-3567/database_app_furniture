const express = require('express');
const router = express.Router();
const Category = require('../model/Category');

// API để thêm danh mục
router.post('/add_category', async (req, res) => {
  const { categoryID, categoryName } = req.body;

  try {
    let category = await Category.findOne({ CategoryID: categoryID });
    if (category) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    category = new Category({
      CategoryID: categoryID,
      CategoryName: categoryName
    });

    await category.save();

    res.status(201).json({ message: 'Category added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// API để hiển thị tất cả các danh mục
router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

