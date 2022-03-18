const mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true,
		required: [true, 'can\'t be blank'],
	},
	imageLink: {
		type: String,
	},
	description: {
		type: String,
	},
	promoted: {
		type: Boolean
	}
});

mongoose.model('game',GameSchema);
