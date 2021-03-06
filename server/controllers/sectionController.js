const mongoose = require('mongoose');
const Section = mongoose.model('Section');


exports.createSection = async (req, res) => {
  const section = await (new Section()).save();
  res.json(section);
};

exports.saveSection = async (req, res, next) => {
  const update = { '$set': Object.assign({}, req.body, { creator: req.user._id }) };
  const section = await Section.findOneAndUpdate({ _id: req.params.id }, update, {
    new: true,
    runValidators: true
  });
  req.section = section;
  next();
};

exports.checkSectionToken = async (req, res, next) => {
  const section = await Section.findOne({ 
    token: req.params.token,
    tokenExpires: { $gt: Date.now() }
  });

  if(!section) return res.status(500).json({ message: 'Request is either invalid or has expired', status: 500 });
  section.creator = req.user._id;
  console.log('section creator set to ', req.user.firstName)
  section.token = undefined;
  section.tokenExpires = undefined;
  const newDoc = await section.save();
  req.section = newDoc;
  next();
};

exports.getNeighboringSections = async (req, res, next) => {
  const section = req.section;
  const [x, y] = section.position.split(',').map(parseFloat);
  const neighbors = await Section.find({ 
    painting: section.painting, 
    position: { $regex: new RegExp(`${x},${y-1}|${x+1},${y}|${x},${y+1}|${x-1},${y}`) } 
  })
  res.json({ section, neighbors });
}