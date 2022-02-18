const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	const user = await User.findOne({
		username : req.body.username
	});
	if (user == null) {
		res.send('User does not exists');
		return;
	}
	if (user.validPassword(req.body.password)) {
		user.generateToken();
		res.send(user.loginToken);
		user.save();
		return;
	}
	res.send('Password Missmatch');
};
