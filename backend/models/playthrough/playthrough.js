const mongoose = require('mongoose');

var PlaythroughSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, ref: 'user'
	},
	game: {
		type: mongoose.Schema.Types.ObjectId, ref: 'game'
	},
	state: {
		type: String,
		enum: ['Will never play', 'Planed to play', 'Currently playing', 'Completed', 'Dropped', '100%-ed'],
	}
});
PlaythroughSchema.index({ user: 1, game: 1 }, { unique: true });

mongoose.model('playthrough', PlaythroughSchema);
