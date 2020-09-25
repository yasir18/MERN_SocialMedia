var express = require('express');
var defaultController = require('../controllers/defaultController');
var router = express.Router();

router.get('/', defaultController.default);

module.exports = router;
