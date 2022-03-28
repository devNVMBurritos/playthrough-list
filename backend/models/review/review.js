const mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User',
	},
	game: {
		type: mongoose.Schema.Types.ObjectId, ref: 'game',
	},
	score: {
		type: Number,
		min: 1,
		max: 5
	},
	review: {
		type: String,
	}
});

mongoose.model('review', ReviewSchema);
