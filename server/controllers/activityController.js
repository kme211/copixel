const mongoose = require("mongoose");
const Activity = mongoose.model("Activity");
const uniq = require("lodash.uniq");
const { PAINTING_COMPLETED, PAINTING_LIKED } = require("../config/activityTypes");

exports.createCompletionActivity = async (req, res) => {
  console.log("createCompletionActivity");
  const paintingIsComplete = req.painting.isComplete;
  console.log("paintingIsComplete", paintingIsComplete);
  if (paintingIsComplete) {
    const users = uniq(
      req.painting.sections.map(section => section.creator.toString())
    );
    console.log(`number of users ${users.length}`, users);
    users.forEach(async user => {
      const data = {
        paintingId: req.painting._id
      };
      console.log("data", data);
      const activity = await new Activity({
        user,
        type: PAINTING_COMPLETED,
        data
      }).save();
      console.log("activity saved");
      // Emit to each user over socket
      req.io.emit(`activity:${req.user.id}`, activity);
    });
  }
};

exports.createLikeActivity = async (req, res) => {
  console.log('createLikeActivity')
  const users = uniq(
      req.painting.sections.map(section => section.creator)
    );
  console.log('users', users)

  const data = {
    paintingId: req.painting._id,
    userName: req.user.name
  };
  
  for(let user of users) {
    console.log('emit for user', user.id)
    const activity = await (new Activity({ type: PAINTING_LIKED, user: user._id, data })).save();
    req.io.emit(`activity:${user.id}`, activity);
  }
}

exports.getActivities = async (req, res) => {
  const activities = await Activity.find({ user: req.user._id });
  res.json({ activities });
};

exports.updateActivities = async (req, res) => {
  const promises = req.body.activityIds.map(id =>
    Activity.findByIdAndUpdate(id, req.body.update, {
      new: true,
      runValidators: true
    })
  );
  const activities = await Promise.all(promises);
  res.json({ activities });
};
