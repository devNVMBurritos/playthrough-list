// const { application } = require('express'); 
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	let bearerToken;

	if (!authHeader) {
		res.send('No authentication token was found');
		return;
	}
	if (authHeader.split(' ')[0] === 'Bearer') {
		bearerToken = authHeader.split(' ')[1];
	}
	const user = await User.findOne({
		loginToken: bearerToken,
	});
	if (!user) {
		res.send('Invalid token');
		return;
	}
	res.locals.user = user;
	next();
};
