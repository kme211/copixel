const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.getUser = async (req, res) => {
  let connection, id;
  if (req.user.sub) {
    [connection, id] = req.user.sub.split("|");
  } else {
    connection = req.user.connection;
    id = req.user.id;
  }

  const user = await User.findOne({
    connection,
    id
  });
  
  if (user) res.json(user);
  else res.json({ error: "no user found" });
};

exports.createUser = async (req, res) => {
  const user = await new User(req.body).save();
  res.json(user);
};
