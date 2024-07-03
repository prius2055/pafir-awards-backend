const express = require('express');
const router = express();
const {
  signInUser,
  registerUser,
  signOutUser,
} = require('../../controllers/userController');

router.post('/login', signInUser);
router.post('/register', registerUser);
// router.delete('/logout', signOutUser);

module.exports = router;
