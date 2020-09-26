const { check, validationResult } = require('express-validator');
const config = require('../config/default.json');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const { username, password } = req.body;
		let user2 = await User.findOne({ username });
		if (user2) {
			return res.status(400).json({
				errors: [
					{
						msg: 'Username already exists, please try logging in',
					},
				],
			});
		}
		let user = new User({
			username,
			password,
		});
		let salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();
		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(
			payload,
			config.secret_key,
			{ expiresIn: '1h' },
			(err, token) => {
				if (err) throw err;
				return res.status(200).json({ user, token });
			}
		);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ exception: error });
	}
};

exports.login = async (req, res) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		res.status(400).json({ erros: errors.array() });
	}
	try {
		const { username, password } = req.body;
		let user = await User.findOne({ username });
		if (user == null) {
			return res
				.status(404)
				.json({ errors: [{ msg: 'Username not exists' }] });
		}
		if (!bcrypt.compareSync(password, user.password)) {
			return res
				.status(404)
				.json({ errors: [{ msg: 'invalid credentials' }] });
		} else {
			const payload = { user: { id: user.id } };
			jwt.sign(
				payload,
				config.secret_key,
				{ expiresIn: '1h' },
				(err, token) => {
					if (err) throw err;
					return res.status(200).json({ user, token });
				}
			);
		}
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.getUserDetails = async (req, res) => {
	try {
		let user = await User.findById(req.user.id).select('username');
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ errors: [error] });
	}
};

exports.validate = (method) => {
	switch (method) {
		case 'register':
			return [
				check('username', 'Username is required').notEmpty(),
				check(
					'password',
					'Please enter a password with 6 or more characters'
				).isLength({ min: 6 }),
			];
		case 'login':
			return [
				check('username', 'Username is required').notEmpty(),
				check('password', 'Password is required').notEmpty(),
			];
	}
};
