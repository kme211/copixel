const mongoose = require('mongoose');
const Painting = mongoose.model('Painting');
const Section = mongoose.model('Section');
const crypto = require('crypto');
const mail = require('../handlers/mail');
const uuid = require('uuid');

exports.getCompletePaintings = async (req, res) => {
  const paintings = await Painting.find({
    isComplete: true,
    isPublic: true
  });
  res.json(paintings);
}

exports.createPainting = async (req, res, next) => {
  const painting = await (new Painting(req.body)).save();
  req.painting = painting;
  next();
};

exports.getNextSectionURI = async (req, res) => {
  const painting = await Painting.findById(req.painting._id).populate('sections');
  const section = await Section.findById(painting.nextSection);
  section.token = crypto.randomBytes(20).toString('hex');
  section.tokenExpires = Date.now() + 3600000;
  await section.save();
  const sectionURI = `/section/${section.token}`;
  res.json({ painting, sectionURI });
};

exports.getPaintingById = async (req, res) => {
  const painting = await Painting.findById(req.params.id).populate('sections');
  res.json(painting);
};

exports.sendNextSection = async (req, res) => {
  const painting = await Painting.findById(req.params.id).populate('sections');
  const section = await Section.findById(painting.nextSection);
  section.token = crypto.randomBytes(20).toString('hex');
  section.tokenExpires = Date.now() + 3600000;
  await section.save();
  const sectionURL = `http://${req.headers.host}/section/${section.token}`;
  await mail.send({
    email: req.body.email,
    subject: 'Someone sent you a copixel request!',
    sectionURL,
    filename: 'request'
  });
  res.json({ message: 'Message sent!', status: '200' });
}

exports.getCompletionStatus = async (req, res, next) => {
  const painting = await Painting.findById(req.section.painting).populate('sections');
  const isPaintingComplete = painting.nextSection ? false : true;
  painting.isComplete = isPaintingComplete;
  await painting.save();
  res.json({ isPaintingComplete, paintingId: painting._id });
}