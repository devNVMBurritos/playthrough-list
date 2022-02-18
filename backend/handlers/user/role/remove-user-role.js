const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	let user;
	if (req.body.id) {
		user = await User.findById(req.body.id);
	} else if (req.body.username) {
		user = await User.findOne({
			title: req.body.username
		});
	}

	if (!user) {
		res.send('User does not exists');
		return;
	}

	if (!req.body.role) {
		res.send('No role were given');
		return;
	}

	if (!user.roles.includes(req.body.role)) {
		for(var i = 0; i < user.roles.length; i++){ 
			if ( user.roles[i] === req.body.role) { 
				user.roles.splice(i, 1); 
			}
		}
		user.save();
	}
	res.send('Role removed!');
};
