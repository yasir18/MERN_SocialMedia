var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController');
var auth = require('../middlewares/auth');
var upload = require('../middlewares/imageUpload');
const { validate } = require('../controllers/profileController');

router.post(
	'/createProfile',
	[auth, upload.single('profile'), validate('createProfile')],
	profileController.createProfile
);
// router.put(
// 	'/editProfile',
// 	auth,
// 	[auth, validate('editProfile')],
// 	profileController.editProfile
// );
// router.get('/getProfile', auth, profileController.getProfileById);
// router.delete('/deleteProfile', auth, profileController.deleteProfileById);

module.exports = router;
