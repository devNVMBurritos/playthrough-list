const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	if (!req.body.id && !req.body.username){
		res.status(400);
		res.send(JSON.stringify('Missing field: Username or _id'));

		return;
	}
	
	let parameter;
	if (req.body.id) {
		parameter = {_id: req.body.id};
	} else if (req.body.username) {
		parameter = {username: req.body.username};
	}

	User.findOne(parameter)
		.then((user) => {
			if (!user) {
				let error = new Error('User does not exist');
				error.responseStatus = 404;
				throw error;
			}
			res.send(JSON.stringify(user.roles));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
