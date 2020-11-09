const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	city: {
		type: String,
	},
	image: {
		type: String,
	},
	bio: {
		type: String,
	},
	profession: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Profile', profileSchema);
