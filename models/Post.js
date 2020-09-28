const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Profile',
	},
	text: {
		type: String,
		required: true,
		unique: true,
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Post', postSchema);