const express = require('express');
const router = express();
const {
  getNominations,
  getNomination,
  addNomination,
  removeNomination,
} = require('../../controllers/nominationController');

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticationMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ code: 401, msg: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ code: 401, msg: 'Unauthorized user. Please login' });
  }
};

router.get('/', getNominations);
router.get('/:id', authenticationMiddleware, getNomination);
router.post('/', addNomination);
router.delete('/:id', authenticationMiddleware, removeNomination);

module.exports = router;
