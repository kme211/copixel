const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    connection: req.params.connection,
    id: req.params.id
  });

  if(user) res.json(user);
  else res.status(500).send('no user found');
};

exports.createUser = async (req, res) => {
  const user = await (new User(req.body)).save();
  res.json(user);
};