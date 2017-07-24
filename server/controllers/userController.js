const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    connection: req.user.connection,
    _id: req.user._id
  }).populate({
    path: 'paintings',
    model: 'Painting',
    populate: {
      path: 'sections',
      model: 'Section'
    }
  });

  if(user) {
    user.paintings = user.paintings.filter(painting => painting.isComplete);
    res.json(user);
  }
  else res.status(500).send('no user found');
};

exports.createUser = async (req, res) => {
  const user = await (new User(req.body)).save();
  res.json(user);
};