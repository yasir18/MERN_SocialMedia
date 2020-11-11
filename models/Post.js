const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	text: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
	image: {
		type: String,
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
