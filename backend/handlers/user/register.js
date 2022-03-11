const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
	let passwordRegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

	if (!passwordRegExp.test(req.body.password)) {
		res.status(400);
		res.send('Invalid Password');

		return;
	}

	User.create({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	})
		.then((newUser) => {
			if (!newUser) {
				res.status(400);
				res.send('Could not create the ');
			}
			newUser.save((err) => {console.log(err);});
			res.send(newUser);
		})
		.catch(err => {
			res.send(err);
		});

};
