const mongoose = require('mongoose');
const Game = mongoose.model('game');

module.exports = async (req, res) => {
	Game.aggregate([
		{	'$lookup': {
			from: 'reviews',
			let: { game: '$_id'},
			pipeline: [{
				$match: {
					$expr: {
						$eq: ['$game', '$$game']
					}
				}}, { 
				$group: {
					_id: '$review._id', 
					count:{ $count: {}}, 
					score: {$avg: '$score' }
				}}
			],
			as: 'review'
		}},
		{ $match: {
			promoted: true
		}}
	])
		.exec().then((data)=> {
			res.send(data);
		})
		.catch((err) => {
			res.status(400);
			res.send(err);
		});
};
