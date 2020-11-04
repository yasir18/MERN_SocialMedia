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

		let profileFromEmail = await Profile.findOne({ email });
		if (profileFromEmail) {
			return res
				.status(500)
				.json({ errors: [{ msg: 'Email Id is already taken' }] });
		}

		if (req.image) profile.image = req.image;

		profile.user = req.user.id;
		await profile.save();

		return res.status(200).json({ profile });
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};

//problem - Everytime new image is getting created in uploads folder for edit
//From UI Dont send profile field if profile is not updated
exports.editProfile = async (req, res) => {
	let id = req.user.id;
	let errors = validationResult(req.body);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, fullName, city, profession } = req.body;
	let profileObject = { email, fullName, city, profession };
	if (req.image) profileObject.image = req.image;
	try {
		let profile = await Profile.findOneAndUpdate(
			{ user: id },
			{ $set: profileObject },
			{ new: true }
		);
		res.status(200).json(profile);
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};

exports.getProfileById = async (req, res) => {
	const id = req.params.id;
	try {
		let profile = await Profile.findOne({ _id: id });
		res.status(200).json(profile);
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};

exports.getMyProfile = async (req, res) => {
	const id = req.user.id;
	try {
		let profile = await Profile.findOne({ user: id });
		if (null === profile)
			return res.status(404).json({ message: 'Profile not yet created' });
		return res.status(200).json(profile);
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};

exports.deleteProfile = async (req, res) => {
	const id = req.user.id;
	try {
		//doesn't throw error if there is no matching user. If profile is null, it means there is no matching user
		let profile = await Profile.findOneAndDelete({ user: id });
		console.log(profile);
		res.status(200).json({ msg: 'Profile Deleted successfully' });
	} catch (error) {
		return res.status(500).json({ errors: [error] });
	}
};
