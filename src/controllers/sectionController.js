const mongoose = require('mongoose');
const Section = mongoose.model('Section');


exports.createSection = async (req, res) => {
  const section = await (new Section()).save();
  res.json(section);
};

exports.saveSection = async (req, res, next) => {
  const section = await Section.findOneAndUpdate({ _id: req.params.id }, req.body, {
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
  req.section = section;
  next();
};

exports.getSection = async (req, res) => {
  const section = req.section;
  section.token = undefined;
  section.tokenExpires = undefined;
  const updatedSection = await section.save();
  res.json({ section });
};