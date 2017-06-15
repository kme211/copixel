const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const sectionSchema = new Schema({
  // creator: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User'
  // },
  index: {
    type: Number,
    required: 'You must supply a section index!'
  },
  updated: {
    type: Date,
    default: Date.now
  },
  painting: {
    type: Schema.ObjectId,
    ref: 'Painting',
    required: 'You must supply a painting!'
  },
  position: {
    type: String,
    required: 'You must supply a position!'
  },
  data: Schema.Types.Mixed,
  token: String,
  tokenExpires: Date
});

sectionSchema.pre('save', function(next) {
  this.updated = Date.now();
  return next();
});

module.exports =  mongoose.model('Section', sectionSchema);