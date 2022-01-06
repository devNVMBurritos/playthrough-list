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
        enum: ['Will never play', 'Planed to play', 'Currently playing', 'Completed', 'Dropped'],
    }
})

mongoose.model('playthrough', PlaythroughSchema);
