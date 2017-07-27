const mongoose = require("mongoose");
const Like = mongoose.model("Like");
const Painting = mongoose.model("Painting");
const Activity = mongoose.model("Activity");

exports.likePainting = async (req, res, next) => {
  console.log('likePainting')
  const painting = await Painting.findById(req.params.paintingId).populate({
    path: 'sections',
    select: 'creator',
    populate: {
      path: 'creator',
      select: 'id'
    }
  });
  console.log('painting', painting)
  const like = await (new Like({ painting: painting._id, user: req.user._id })).save();
  req.painting = painting;
  next();
}