const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = async (req, res) => {
  if (req.body.id) {
    const game = await User.deleteOne({
        _id: req.body.id
    });
  } else if (req.body.username) {
    const game = await User.deleteOne({
      title: req.body.username
    });
  }

  res.send('User removed!');
};
