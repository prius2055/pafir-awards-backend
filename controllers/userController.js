const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const signInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ code: 401, msg: 'Invalid credentials' });
    }

    const passwordValidity = await bcrypt.compare(password, user.password);
    if (!passwordValidity) {
      return res.status(400).json({ code: 401, msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie('token', token, { httpOnly: true });
    req.session.token = token;
    res.status(200).json({ user, code: 200, msg: 'Successfully logged in' });
  } catch (error) {
    res.status(500).json({ code: 500, msg: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(200).json({ user, code: 200, msg: 'User created' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ code: 400, msg: 'User Already exist' });
    }
    res.status(500).json({ code: 500, msg: error.message });
  }
};

module.exports = { signInUser, registerUser };
