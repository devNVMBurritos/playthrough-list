const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	if (!req.body.id && !req.body.username){
		res.status(400);
		res.send(JSON.stringify('Missing field: Username or _id'));

		return;
	}

	let searchParameter;
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
				let error = new Error('User does not exist');
				error.responseStatus = 404;
				throw error;
			} 

			res.send(JSON.stringify('User removed!'));
		}).catch((err) => {
			res.status(404);
			res.send(err.message);
		});
};
