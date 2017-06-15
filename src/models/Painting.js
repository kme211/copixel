const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const Section = mongoose.model('Section');

const paintingSchema = new Schema({
  // creator: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: 'You must supply a creator!'
  // },
  created: {
    type: Date,
    default: Date.now
  },
  width: {
    type: Number,
    min: 1,
    max: 5,
    required: 'You must supply a width!'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  height: {
    type: Number,
    min: 1,
    max: 5,
    required: 'You must supply a height!'
  },
  uuid: String
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

paintingSchema.virtual('sections', {
  ref: 'Section',
  localField: '_id',
  foreignField: 'painting'
});

paintingSchema.pre('save', async function(next) {
  if(!this.isModified('width')) return;

  let promises = [];
  for(let x = 0; x < this.width; x++) {
    for(let y = 0; y < this.height; y++) {
      let sectionPromise = (new Section({ painting: this._id, position: `${x},${y}` })).save();
      promises.push(sectionPromise);
    }
  }

  await Promise.all(promises);
  next();
});

paintingSchema.virtual('nextSection').get(function() {
  if(!this.sections) return null;
  const nextSection = this.sections.find((section) => !section.data);
  return nextSection ? nextSection._id : null;
});

module.exports = mongoose.model('Painting', paintingSchema);