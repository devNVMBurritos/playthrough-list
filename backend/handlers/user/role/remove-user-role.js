const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	if (!req.body.role) {
		res.send('No role were given');
		return;
	}

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

			if (user.roles.includes(req.body.role)) {
				for(var i = 0; i < user.roles.length; i++){ 
					if ( user.roles[i] === req.body.role) { 
						user.roles.splice(i, 1); 
					}
				}
				user.save();
			}

			res.send('Role removed!');
		});
};
