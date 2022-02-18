const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	let searchParameter;

	if (!req.body.id && !req.body.username){
		res.status(400);
		res.send('Missing field: Username or _id');
		return;
	}

	if (req.body.id) { 
		searchParameter = {
			_id: req.body.id
		};
	} else {
		searchParameter = {
			username: req.body.username
		};
	}

	User.deleteOne(searchParameter)
		.then((userRes) => {
			if (userRes.deletedCount === 1) {
				res.send('User removed!');
			} else if(userRes.deletedCount === 0) {
				throw new Error('User was not found!');
			}
		}).catch((err) => {
			res.status(404);
			res.send(err.message);
		});
};
