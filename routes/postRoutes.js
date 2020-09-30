var express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const profileController = require('../controllers/postController');

router.get('/getAllPosts', auth, profileController.getAllPosts);
router.get('/getPostsByUser', auth, profileController.getPostsByUserId);
router.post(
	'/createPost',
	[auth, profileController.validate('createPost')],
	profileController.createPost
);
router.post('/like/:id', auth, profileController.likePostById);
router.post('/unlike/:id', auth, profileController.unlikePostById);

module.exports = router;
