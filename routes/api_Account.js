const express = require('express');
const router = express.Router();
const Account = require('../model/Account');

// Đăng ký
router.post('/register', async (req, res) => {
  const { email, password, fullname } = req.body;

  try {
    let account = await Account.findOne({ Email: email });
    if (account) {
      return res.status(400).json({ message: 'User already exists' });
    }

    account = new Account({
      Email: email,
      Password: password,
      Fullname: fullname
    });

    await account.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let account = await Account.findOne({ Email: email });
    if (!account) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (password !== account.Password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

