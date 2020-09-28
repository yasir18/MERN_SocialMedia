const Profile = require('../models/Profile');
var multer = require('multer');
const { check, validationResult } = require('express-validator');

exports.validate = (method) => {
	switch (method) {
		case 'createProfile':
		case 'editProfile':
			return [
				check('email', 'Email is required').notEmpty(),
				check('email', 'Please enter a valid email Id').isEmail(),
				check('fullName', 'Name is required').notEmpty(),
			];
	}
};

exports.createProfile = async (req, res) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const { email, fullName, city, profession } = req.body;
		let profile = new Profile({
			email,
			fullName,
			city,
			profession,
		});

		if (req.image) profile.image = req.image;

		profile.user = req.user.id;
		await profile.save();

		return res.status(200).json({ profile });
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};
