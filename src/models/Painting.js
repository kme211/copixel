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
    required: 'You must supply an isPublic value!'
  },
  height: {
    type: Number,
    min: 1,
    max: 5,
    required: 'You must supply a height!'
  },
  isComplete: {
    type: Boolean,
    default: false
  }
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
  if(!this.isModified('width')) return next();
  let promises = [];
  let index = 0;
  for(let x = 0; x < this.width; x++) {
    for(let y = 0; y < this.height; y++) {
      let sectionPromise = (new Section({ painting: this._id, position: `${x},${y}`, index })).save();
      index++;
      promises.push(sectionPromise);
    }
  }

  await Promise.all(promises);
  next();
});

paintingSchema.virtual('nextSection').get(function() {
  if(!this.sections) return null;
  const nextSection = this.sections
    .sort((a, b) => {
      if(a.index < b.index) return -1;
      if(a.index > b.index) return 1;
      return 0;
    })
    .find((section) => !section.data);
  return nextSection ? nextSection._id : null;
});

module.exports = mongoose.model('Painting', paintingSchema);