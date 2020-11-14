const Post = require('../models/Post');
const Profile = require('../models/Profile');
const { check, validationResult } = require('express-validator');

exports.validate = (method) => {
	switch (method) {
		case 'createPost':
			return [check('text', 'Body post is required').notEmpty()];
	}
};

exports.createPost = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errros: errors.array() });
	}
	const userId = req.user.id;
	try {
		const user = await Profile.findOne({ user: userId });
		let post = new Post({
			user: userId,
			name: user.fullName,
			image: user.image,
			text: req.body.text,
		});

		let returnedPost = await post.save();
		return res.status(200).json(returnedPost);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: [error] });
	}
};

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort({ createdAt: -1 });
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};
exports.getPostsByUserId = async (req, res) => {
	try {
		const userId = req.params.id;
		const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};

exports.likePostById = async (req, res) => {
	const userId = req.user.id;
	const postId = req.params.id;
	try {
		let post = await Post.findById(postId);
		if (post.likes.some((like) => like.user.toString() === userId))
			return res.status(409).json({ msg: 'post already liked by user' });
		post.likes.unshift({ user: userId });
		await post.save();
		return res.status(200).json(post);
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};

exports.unlikePostById = async (req, res) => {
	const userId = req.user.id;
	const postId = req.params.id;
	try {
		let post = await Post.findById(postId);
		if (!post.likes.some((like) => like.user.toString() === userId))
			return res.status(409).json({ msg: 'post not yet liked by user' });
		post.likes = post.likes.filter(
			(like) => like.user.toString() !== userId
		);
		await post.save();
		return res.status(200).json(post);
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};
