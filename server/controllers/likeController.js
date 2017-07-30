const mongoose = require("mongoose");
const Like = mongoose.model("Like");
const Painting = mongoose.model("Painting");
const Activity = mongoose.model("Activity");

const createNewLike = async (paintingId, userId) => {
  return await (new Like({ painting: paintingId, user: userId })).save();
}

const getPaintingWithCreators = async (paintingId) => {
  const painting = await Painting.findById(paintingId).populate({
      path: 'sections',
      select: 'creator',
      populate: {
        path: 'creator',
        select: 'id'
      }
    });
  return painting;
}

exports.toggleLike = async (req, res, next) => {
  const paintingId = req.params.paintingId;
  let like = await Like.findOne({ painting: paintingId, user: req.user._id });
  if(!like) {
    like = await createNewLike(paintingId, req.user._id);
    req.painting = await getPaintingWithCreators(paintingId);
    res.json({ paintingId, liked: true });
    return next();
  } else {
    await Like.findByIdAndRemove(like._id);
    res.json({ paintingId, liked: false });
  }
}