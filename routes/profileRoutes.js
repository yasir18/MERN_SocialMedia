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
router.put(
	'/editProfile',
	[auth, upload.single('profile'), validate('editProfile')],
	profileController.editProfile
);
router.get('/getProfile/:id', auth, profileController.getProfileById);
router.get(
	'/getProfileByUserId/:id',
	auth,
	profileController.getProfileByUserId
);

router.get('/getMyProfile', auth, profileController.getMyProfile);
router.delete('/deleteProfile', auth, profileController.deleteProfile);

module.exports = router;
