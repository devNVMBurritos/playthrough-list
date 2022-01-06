const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
  if (req.body.id) {
    const game = await User.findById(req.body.id);
  } else if (req.body.username) {
    const game = await User.findOne({
      title: req.body.username
    });
  }

  if (!user) {
    res.send('User does not exists');
    return;
  }
  res.send(user.roles);
};
