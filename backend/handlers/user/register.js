const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
  passwordRegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

  if (!passwordRegExp.test(req.body.password)) {
    res.status(400);
    res.send('Invalid Password');

    return;
  }

  newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }).catch(err => {
    if (err.name === 'ValidationError') {
      res.send(Object.values(err.errors));
    } else {
      res.send(err);
    }
  });

  if (newUser != null) {
    newUser.save(function(error){

    });
    res.send('OK');
  }
};
