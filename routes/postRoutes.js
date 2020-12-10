var express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');

router.get('/getAllPosts', auth, postController.getAllPosts);
router.get('/getPostsByUser/:id', auth, postController.getPostsByUserId);
router.post(
	'/createPost',
	[auth, postController.validate('createPost')],
	postController.createPost
);
router.post('/like/:id', auth, postController.likePostById);
router.post('/unlike/:id', auth, postController.unlikePostById);
router.delete('/delete/:id', auth, postController.deletePostById);

module.exports = router;
