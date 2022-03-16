const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	let parameter;

	if (req.body.id) {
		parameter = {_id: req.body.id};
	} else if (req.body.username) {
		parameter = {username: req.body.username};
	}
  
	if (!parameter) {
		res.status(400);
		res.send('Missing parameter: id or username');
	}

	User.findOne(parameter)
		.then((user) => {
			if (!user) {
				let error = new Error('User does not exist');
				error.responseStatus = 404;
				throw error;
			}

			res.send({
				id: user._id,
				username: user.username,
				email: user.email,
				roles: user.roles,
				reviews: user.reviews,
				token: user.token
			});
		})
		.catch((err) => {
			res.status(err.responseStatus);
			res.send(err.message);
		});
};
