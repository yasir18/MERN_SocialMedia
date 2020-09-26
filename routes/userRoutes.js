const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, userController.getUserDetails);
router.post(
	'/register',
	userController.validate('register'),
	userController.register
);
router.post('/login', userController.validate('login'), userController.login);

module.exports = router;
