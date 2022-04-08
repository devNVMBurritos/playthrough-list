const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	if (!req.body.id && !req.body.username) {
		res.status(400);
		res.send(JSON.stringify('Missing parameter "id" or "username".'));
		
		return;
	}

	let parameter;
	if (req.body.id) {
		parameter = { _id: req.body.id };
	} else {
		parameter = { username: req.body.username };
	}

	User.findOne(parameter)
		.then((user) => {
			if (!user) {
				let error = new Error('User does not exist');
				error.responseStatus = 404;
				throw error;
			}

			res.send(JSON.stringify({
				id: user._id,
				username: user.username,
				email: user.email,
				roles: user.roles,
				reviews: user.reviews,
				token: user.token
			}));
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(JSON.stringify(err.message));
		});
};
