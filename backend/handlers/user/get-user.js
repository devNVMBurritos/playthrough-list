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
	res.send(user._id);
};
