const router = require('express').Router();
const { signUp, login, logout } = require('../../controllers/userController');

// User routes
router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router; 
 