const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const activitySchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user!'
  }, 
  type: {
    type: Number,
    required: 'You must supply an activity type!'
  },
  data: Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now
  },
  viewed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Activity', activitySchema);