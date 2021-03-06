const mongoose = require("mongoose");
const Activity = mongoose.model("Activity");
const User = mongoose.model("User");
const uniq = require("lodash.uniq");
const {
  PAINTING_COMPLETED,
  PAINTING_LIKED,
  SECTION_REQUEST
} = require("../config/activityTypes");

exports.createCompletionActivity = async (req, res) => {
  const paintingIsComplete = req.painting.isComplete;

  if (paintingIsComplete) {
    const users = uniq(
      req.painting.sections.map(section => section.creator.toString())
    );

    users.forEach(async user => {
      const data = {
        paintingId: req.painting._id
      };

      const activity = await new Activity({
        user,
        type: PAINTING_COMPLETED,
        data
      }).save();

      // Emit to each user over socket
      req.io.emit(`activity:${user}`, activity);
    });
  }
};

exports.createLikeActivity = async (req, res) => {
  const users = uniq(req.painting.sections.map(section => section.creator));

  const data = {
    paintingId: req.painting._id,
    userName: req.user.firstName + " " + req.user.lastName
  };

  for (let user of users) {
    const activity = await new Activity({
      type: PAINTING_LIKED,
      user: user._id,
      data
    }).save();

    req.io.emit(`activity:${user.id}`, activity);
  }
  res.json({ paintingId: req.painting._id, liked: true });
};

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

exports.createAcceptActivity = async (req, res) => {};

exports.createRequestActivity = async (req, res) => {
  console.log('createRequestActivity', req.nextUserEmail)
  const user = await User.findOne({ email: req.nextUserEmail });

  if (user) {
    const data = {
      sectionToken: req.section.token,
      userName: req.user.firstName + " " + req.user.lastName
    };
    const activity = await new Activity({
      user: user._id,
      data,
      type: SECTION_REQUEST
    }).save();
    req.io.emit(`activity:${user.id}`, activity);
  }

  res.json({ message: "Message sent!", status: "200" });
};
