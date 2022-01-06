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
  if (!req.body.role) {
      res.send('No role were given');
      return;
  }
  if (!user.roles.includes(req.body.role)) {
    user.roles.push(req.body.role);
    user.save();
  }
  res.send('Roles added!');
};
